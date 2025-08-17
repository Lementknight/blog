/* ADA Compliant Theme Toggle Enhancement */
document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle) return;

    // Create screen reader announcement area
    const srOnly = document.createElement('div');
    srOnly.setAttribute('aria-live', 'polite');
    srOnly.setAttribute('aria-atomic', 'true');
    srOnly.className = 'sr-only';
    srOnly.style.cssText = 'position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0;';
    document.body.appendChild(srOnly);

    // Function to update ARIA attributes and announce changes
    function updateThemeState(isDark) {
        const currentTheme = isDark ? 'dark' : 'light';
        const oppositeTheme = isDark ? 'light' : 'dark';
        
        // Update ARIA attributes
        themeToggle.setAttribute('aria-pressed', isDark.toString());
        themeToggle.setAttribute('aria-label', `Switch to ${oppositeTheme} theme. Current theme: ${currentTheme}`);
        themeToggle.title = `Switch to ${oppositeTheme} theme (Alt + T)`;
        
        // Announce change to screen readers
        srOnly.textContent = `Switched to ${currentTheme} theme`;
        
        // Clear announcement after screen readers have had time to read it
        setTimeout(() => {
            srOnly.textContent = '';
        }, 1000);
    }

    // Initialize ARIA state based on current theme
    const isDarkMode = document.body.className.includes('dark');
    updateThemeState(isDarkMode);

    // Enhanced click handler with accessibility features
    themeToggle.addEventListener('click', function(e) {
        // Prevent default behavior
        e.preventDefault();
        
        const wasDark = document.body.className.includes('dark');
        
        if (wasDark) {
            document.body.classList.remove('dark');
            localStorage.setItem("pref-theme", 'light');
        } else {
            document.body.classList.add('dark');
            localStorage.setItem("pref-theme", 'dark');
        }
        
        // Update accessibility attributes
        updateThemeState(!wasDark);
    });

    // Enhanced keyboard support
    themeToggle.addEventListener('keydown', function(e) {
        // Support Enter and Space keys (standard for buttons)
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            themeToggle.click();
        }
    });

    // Support for system theme changes
    if (window.matchMedia) {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        
        mediaQuery.addEventListener('change', function(e) {
            // Only update if user hasn't manually set a preference
            if (!localStorage.getItem('pref-theme')) {
                const isDark = e.matches;
                document.body.classList.toggle('dark', isDark);
                updateThemeState(isDark);
            }
        });
    }
});
