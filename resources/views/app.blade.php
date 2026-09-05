<!DOCTYPE html>
<html lang="id" class="dark scroll-smooth">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    
    <!-- Primary Meta SEO -->
    <meta name="author" content="Pemerintah Desa Karangwungu">
    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
    <meta name="geo.region" content="ID-JI">
    <meta name="geo.placename" content="Karangwungu, Karanggeneng, Lamongan">
    <meta name="geo.position" content="-7.0396;112.3551">
    <meta name="ICBM" content="-7.0396, 112.3551">
    <meta name="theme-color" content="#070709">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400;1,600&display=swap" rel="stylesheet">

    <!-- Inline Theme Initializer (Prevent FOUC) -->
    <script>
        (function() {
            try {
                const savedTheme = localStorage.getItem('theme');
                if (savedTheme === 'light') {
                    document.documentElement.classList.remove('dark');
                    document.documentElement.classList.add('light');
                } else {
                    document.documentElement.classList.add('dark');
                    document.documentElement.classList.remove('light');
                }
            } catch (e) {
                document.documentElement.classList.add('dark');
            }
        })();
    </script>

    <!-- Calendar Picker Indicator Styling (Ensures high visibility in dark mode across all browsers) -->
    <style>
        input[type="date"] {
            color-scheme: light;
        }
        .dark input[type="date"] {
            color-scheme: dark !important;
        }
        input[type="date"]::-webkit-calendar-picker-indicator {
            cursor: pointer;
            border-radius: 4px;
            opacity: 0.75;
            transform: scale(1.15);
            margin-right: 2px;
            transition: opacity 0.2s ease, transform 0.2s ease, filter 0.2s ease;
        }
        input[type="date"]::-webkit-calendar-picker-indicator:hover {
            opacity: 1;
            transform: scale(1.25);
        }
        .dark input[type="date"]::-webkit-calendar-picker-indicator {
            filter: invert(1) brightness(1.25) !important;
            opacity: 0.95 !important;
        }
        .dark input[type="date"]::-webkit-calendar-picker-indicator:hover {
            filter: invert(1) brightness(1.5) drop-shadow(0 0 3px rgba(255, 255, 255, 0.6)) !important;
            opacity: 1 !important;
        }
    </style>

    @viteReactRefresh
    @vite(['resources/css/app.css', 'resources/js/app.jsx'])
    @inertiaHead
</head>
<body class="bg-texture-main text-zinc-900 dark:text-zinc-100 antialiased min-h-screen selection:bg-red-800 selection:text-amber-300 transition-colors duration-300">
    @inertia
</body>
</html>
