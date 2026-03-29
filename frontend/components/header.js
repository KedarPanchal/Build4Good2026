class Header extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
        <div class="fixed top-4 left-0 right-0 z-50 flex justify-center px-4">
            <nav class="nav-capsule flex justify-between items-center px-8 py-2.5 w-full max-w-4xl rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.1)]">
                <!-- Brand Logo -->
                <div class="text-lg font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#f2cf66]">
                    Lex.AI
                </div>
                <!-- Desktop Navigation -->
                <div class="hidden md:flex items-center space-x-8">
                    <a class="text-slate-300 font-medium hover:text-[#D4AF37] transition-colors duration-300 text-xs uppercase tracking-wider" href="#">Contact</a>
                    <div class="flex items-center space-x-4">
                        <button class="text-slate-300 font-medium hover:text-[#D4AF37] transition-colors duration-300 flex items-center gap-1.5 text-xs uppercase tracking-wider">
                            <span class="material-symbols-outlined text-sm">person</span>
                            Profile
                        </button>
                        <button onclick="window.location.href='search.html'" class="bg-gradient-to-r from-primary to-[#f2cf66] text-on-primary-fixed font-bold px-4 py-1.5 rounded-full text-xs uppercase tracking-wider transition-all duration-400 active:scale-95 shadow-lg shadow-primary/10">
                            Try Now
                        </button>
                    </div>
                </div>
                <!-- Mobile Menu Toggle -->
                <div class="md:hidden">
                    <span class="material-symbols-outlined text-primary">menu</span>
                </div>
            </nav>
        </div>
        `;
    }
}

customElements.define("app-header", Header);
