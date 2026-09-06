import React, { useState, useRef, useEffect } from 'react';
import { X, ZoomIn, ZoomOut, RotateCw, Check, Move, RefreshCw } from 'lucide-react';

/**
 * ImageCropModal
 * Modal interaktif untuk memotong (crop) dan memposisikan foto potret (rasio 3:4).
 * Mendukung drag/pan (mouse & touch), zoom in/out, rotasi 90°, dan grid rule-of-thirds.
 */
export default function ImageCropModal({
    isOpen,
    onClose,
    imageSrc,
    onCropComplete,
    aspectRatio = 3 / 4, // 3:4 vertikal potret
    outputWidth = 900,
    outputHeight = 1200,
    title = 'Sesuaikan & Crop Foto Kades',
    subtitle = 'Geser dan atur perbesaran foto agar pas dengan bingkai dinas 3:4',
}) {
    const [zoom, setZoom] = useState(1);
    const [rotation, setRotation] = useState(0); // 0, 90, 180, 270
    const [pan, setPan] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
    const [imageLoaded, setImageLoaded] = useState(false);
    const [naturalSize, setNaturalSize] = useState({ width: 0, height: 0 });
    const [showGrid, setShowGrid] = useState(true);

    const imageRef = useRef(null);
    const containerRef = useRef(null);

    // Dynamic viewport dimensions based on aspectRatio
    const maxViewport = aspectRatio >= 1.5 ? 440 : 320;
    const viewportWidth = aspectRatio >= 1 ? maxViewport : Math.round(maxViewport * aspectRatio);
    const viewportHeight = aspectRatio >= 1 ? Math.round(maxViewport / aspectRatio) : maxViewport;

    // Reset when modal opens with a new imageSrc
    useEffect(() => {
        if (isOpen && imageSrc) {
            setZoom(1);
            setRotation(0);
            setPan({ x: 0, y: 0 });
            setImageLoaded(false);
        }
    }, [isOpen, imageSrc]);

    // Handle image load to determine dimensions & initial position
    const handleImageLoad = (e) => {
        const { naturalWidth, naturalHeight } = e.target;
        setNaturalSize({ width: naturalWidth, height: naturalHeight });
        setImageLoaded(true);

        // Center initially
        centerImage(naturalWidth, naturalHeight, 1, 0);
    };

    // Calculate base dimensions that cover the viewport
    const getBaseDimensions = (w, h, rot) => {
        if (!w || !h) return { width: viewportWidth, height: viewportHeight };
        const isRotated = rot === 90 || rot === 270;
        const currentW = isRotated ? h : w;
        const currentH = isRotated ? w : h;

        const scaleToCover = Math.max(viewportWidth / currentW, viewportHeight / currentH);
        return {
            width: currentW * scaleToCover,
            height: currentH * scaleToCover,
            rawScale: scaleToCover,
        };
    };

    const centerImage = (w, h, z, rot) => {
        const base = getBaseDimensions(w, h, rot);
        const renderW = base.width * z;
        const renderH = base.height * z;

        setPan({
            x: (viewportWidth - renderW) / 2,
            y: (viewportHeight - renderH) / 2,
        });
    };

    // Clamp pan so image always covers the viewport
    const clampPan = (newX, newY, z, rot) => {
        const base = getBaseDimensions(naturalSize.width, naturalSize.height, rot);
        const renderW = base.width * z;
        const renderH = base.height * z;

        const minX = viewportWidth - renderW;
        const maxX = 0;
        const minY = viewportHeight - renderH;
        const maxY = 0;

        return {
            x: Math.min(maxX, Math.max(minX, newX)),
            y: Math.min(maxY, Math.max(minY, newY)),
        };
    };

    // Mouse drag handlers
    const handleMouseDown = (e) => {
        e.preventDefault();
        setIsDragging(true);
        setDragStart({
            x: e.clientX - pan.x,
            y: e.clientY - pan.y,
        });
    };

    const handleMouseMove = (e) => {
        if (!isDragging) return;
        const nextX = e.clientX - dragStart.x;
        const nextY = e.clientY - dragStart.y;
        setPan(clampPan(nextX, nextY, zoom, rotation));
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    // Touch drag handlers
    const handleTouchStart = (e) => {
        if (e.touches.length === 1) {
            setIsDragging(true);
            setDragStart({
                x: e.touches[0].clientX - pan.x,
                y: e.touches[0].clientY - pan.y,
            });
        }
    };

    const handleTouchMove = (e) => {
        if (!isDragging || e.touches.length !== 1) return;
        const nextX = e.touches[0].clientX - dragStart.x;
        const nextY = e.touches[0].clientY - dragStart.y;
        setPan(clampPan(nextX, nextY, zoom, rotation));
    };

    const handleTouchEnd = () => {
        setIsDragging(false);
    };

    // Wheel zoom
    const handleWheel = (e) => {
        e.preventDefault();
        const delta = e.deltaY * -0.0015;
        const newZoom = Math.min(3, Math.max(1, zoom + delta));
        setZoom(newZoom);
        setPan((prev) => clampPan(prev.x, prev.y, newZoom, rotation));
    };

    // Zoom buttons
    const handleZoomChange = (newZoom) => {
        const clamped = Math.min(3, Math.max(1, newZoom));
        setZoom(clamped);
        setPan((prev) => clampPan(prev.x, prev.y, clamped, rotation));
    };

    // Rotate 90 degrees
    const handleRotate = () => {
        const nextRot = (rotation + 90) % 360;
        setRotation(nextRot);
        centerImage(naturalSize.width, naturalSize.height, zoom, nextRot);
    };

    // Reset position & zoom
    const handleReset = () => {
        setZoom(1);
        setRotation(0);
        centerImage(naturalSize.width, naturalSize.height, 1, 0);
    };

    // Perform the high-res crop to canvas and export as file
    const handleApply = () => {
        if (!imageRef.current) return;

        const canvas = document.createElement('canvas');
        canvas.width = outputWidth;
        canvas.height = outputHeight;
        const ctx = canvas.getContext('2d');

        if (!ctx) return;

        // Ratio between output canvas and interactive viewport
        const factor = outputWidth / viewportWidth;

        // Anti-aliasing quality
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';

        // Calculate dimensions
        const base = getBaseDimensions(naturalSize.width, naturalSize.height, rotation);
        const renderW = base.width * zoom * factor;
        const renderH = base.height * zoom * factor;
        const renderX = pan.x * factor;
        const renderY = pan.y * factor;

        // Apply rotation if needed
        if (rotation !== 0) {
            ctx.save();
            ctx.translate(canvas.width / 2, canvas.height / 2);
            ctx.rotate((rotation * Math.PI) / 180);
            // Center-based draw
            const isRotated = rotation === 90 || rotation === 270;
            const drawW = isRotated ? renderH : renderW;
            const drawH = isRotated ? renderW : renderH;
            ctx.drawImage(
                imageRef.current,
                -drawW / 2 + (renderX + renderW / 2 - canvas.width / 2),
                -drawH / 2 + (renderY + renderH / 2 - canvas.height / 2),
                drawW,
                drawH
            );
            ctx.restore();
        } else {
            ctx.drawImage(imageRef.current, renderX, renderY, renderW, renderH);
        }

        // Export as compressed high-quality JPEG File
        canvas.toBlob(
            (blob) => {
                if (!blob) {
                    onClose();
                    return;
                }
                const croppedFile = new File([blob], `cropped_${Date.now()}.jpg`, {
                    type: 'image/jpeg',
                    lastModified: Date.now(),
                });
                const previewUrl = URL.createObjectURL(blob);
                onCropComplete(croppedFile, previewUrl);
                onClose();
            },
            'image/jpeg',
            0.92
        );
    };

    if (!isOpen || !imageSrc) return null;

    const base = getBaseDimensions(naturalSize.width, naturalSize.height, rotation);
    const renderW = base.width * zoom;
    const renderH = base.height * zoom;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
            <div className="relative w-full max-w-lg bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col text-zinc-100 my-auto">
                {/* Header */}
                <div className="px-5 py-4 border-b border-zinc-800 flex items-center justify-between">
                    <div>
                        <div className="flex items-center gap-2">
                            <h3 className="text-sm font-bold text-white tracking-wide">
                                {title}
                            </h3>
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30">
                                {aspectRatio === 1
                                    ? '1:1 Persegi'
                                    : Math.abs(aspectRatio - 2.4) < 0.1 || Math.abs(aspectRatio - 16 / 7) < 0.1
                                    ? 'Sampul Card (2.4:1)'
                                    : Math.abs(aspectRatio - 0.75) < 0.01
                                    ? '3:4 Potret'
                                    : `${Math.round(aspectRatio * 100) / 100}:1 Rasio`}
                            </span>
                        </div>
                        <p className="text-xs text-zinc-400 mt-0.5">{subtitle}</p>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
                        title="Tutup"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Body / Cropper Area */}
                <div className="p-5 flex flex-col items-center select-none bg-zinc-950/60">
                    {/* 3:4 Viewport Box */}
                    <div
                        ref={containerRef}
                        onMouseDown={handleMouseDown}
                        onMouseMove={handleMouseMove}
                        onMouseUp={handleMouseUp}
                        onMouseLeave={handleMouseUp}
                        onTouchStart={handleTouchStart}
                        onTouchMove={handleTouchMove}
                        onTouchEnd={handleTouchEnd}
                        onWheel={handleWheel}
                        className={`relative rounded-xl overflow-hidden shadow-2xl border-2 border-red-500/70 bg-zinc-950 cursor-grab ${
                            isDragging ? 'cursor-grabbing ring-2 ring-red-500' : ''
                        }`}
                        style={{
                            width: `${viewportWidth}px`,
                            height: `${viewportHeight}px`,
                        }}
                    >
                        {/* Hidden image element to measure & draw */}
                        <img
                            ref={imageRef}
                            src={imageSrc}
                            crossOrigin="anonymous"
                            alt="Crop Preview"
                            onLoad={handleImageLoad}
                            draggable={false}
                            className="absolute pointer-events-none transition-none will-change-transform"
                            style={{
                                width: `${renderW}px`,
                                height: `${renderH}px`,
                                transform: `translate3d(${pan.x}px, ${pan.y}px, 0px) rotate(${rotation}deg)`,
                                transformOrigin: 'center center',
                                maxWidth: 'none',
                                opacity: imageLoaded ? 1 : 0,
                            }}
                        />

                        {/* Rule-of-Thirds Grid Overlay */}
                        {showGrid && (
                            <div className="absolute inset-0 pointer-events-none grid grid-cols-3 grid-rows-3">
                                <div className="border-r border-b border-white/25" />
                                <div className="border-r border-b border-white/25" />
                                <div className="border-b border-white/25" />
                                <div className="border-r border-b border-white/25" />
                                <div className="border-r border-b border-white/25" />
                                <div className="border-b border-white/25" />
                                <div className="border-r border-white/25" />
                                <div className="border-r border-white/25" />
                                <div className="" />
                            </div>
                        )}

                        {/* Drag Hint Overlay (fades out when dragged) */}
                        <div className="absolute top-2 left-2 pointer-events-none px-2 py-1 rounded bg-black/60 backdrop-blur-xs text-[10px] font-medium text-white/80 flex items-center gap-1">
                            <Move className="w-3 h-3 text-red-400" />
                            <span>Geser foto untuk memposisikan</span>
                        </div>
                    </div>

                    {/* Controls (Zoom slider, Rotate, Reset, Grid) */}
                    <div className="w-full max-w-[340px] mt-4 space-y-3">
                        {/* Zoom Bar */}
                        <div className="flex items-center gap-3 bg-zinc-900/80 px-3 py-2 rounded-xl border border-zinc-800">
                            <button
                                type="button"
                                onClick={() => handleZoomChange(zoom - 0.2)}
                                className="p-1 rounded-md text-zinc-400 hover:text-white hover:bg-zinc-800"
                                title="Perkecil"
                            >
                                <ZoomOut className="w-4 h-4" />
                            </button>
                            <input
                                type="range"
                                min="1"
                                max="3"
                                step="0.01"
                                value={zoom}
                                onChange={(e) => handleZoomChange(parseFloat(e.target.value))}
                                className="w-full accent-red-600 h-1.5 bg-zinc-700 rounded-lg cursor-pointer"
                            />
                            <button
                                type="button"
                                onClick={() => handleZoomChange(zoom + 0.2)}
                                className="p-1 rounded-md text-zinc-400 hover:text-white hover:bg-zinc-800"
                                title="Perbesar"
                            >
                                <ZoomIn className="w-4 h-4" />
                            </button>
                            <span className="text-[11px] font-mono text-zinc-400 min-w-[32px] text-right">
                                {zoom.toFixed(1)}x
                            </span>
                        </div>

                        {/* Action buttons (Rotate, Reset, Toggle Grid) */}
                        <div className="flex items-center justify-between text-xs">
                            <div className="flex items-center gap-2">
                                <button
                                    type="button"
                                    onClick={handleRotate}
                                    className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 transition-colors border border-zinc-700"
                                    title="Putar 90 Derajat"
                                >
                                    <RotateCw className="w-3.5 h-3.5" />
                                    <span>Putar</span>
                                </button>
                                <button
                                    type="button"
                                    onClick={handleReset}
                                    className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 transition-colors border border-zinc-700"
                                    title="Kembalikan Posisi Semula"
                                >
                                    <RefreshCw className="w-3.5 h-3.5" />
                                    <span>Reset</span>
                                </button>
                            </div>

                            <button
                                type="button"
                                onClick={() => setShowGrid(!showGrid)}
                                className={`px-2.5 py-1.5 rounded-lg transition-colors border ${
                                    showGrid
                                        ? 'bg-zinc-800 text-amber-400 border-amber-500/30'
                                        : 'bg-zinc-800/40 text-zinc-400 border-zinc-800'
                                }`}
                            >
                                Grid Bantu
                            </button>
                        </div>
                    </div>
                </div>

                {/* Footer Buttons */}
                <div className="px-5 py-3.5 border-t border-zinc-800 bg-zinc-900/90 flex items-center justify-end gap-2.5">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 rounded-xl text-xs font-semibold text-zinc-300 hover:text-white bg-zinc-800 hover:bg-zinc-700 transition-all"
                    >
                        Batal
                    </button>
                    <button
                        type="button"
                        onClick={handleApply}
                        className="flex items-center gap-1.5 px-5 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 shadow-md shadow-red-950/40 transition-all cursor-pointer"
                    >
                        <Check className="w-4 h-4" />
                        <span>Terapkan & Simpan Foto</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
