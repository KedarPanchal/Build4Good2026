class Footer extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
        <footer class="w-full py-4 bg-surface border-t border-outline-variant/5 shrink-0">
            <div class="relative flex flex-col md:flex-row justify-between items-center px-8 max-w-[1440px] mx-auto font-['Inter'] text-[10px] uppercase tracking-widest">
                <div class="text-slate-500 mb-2 md:mb-0">
                    © 2026 Lex.AI. Legal Access for Everyone.
                </div>
                <div class="flex space-x-8 md:absolute md:left-1/2 md:transform md:-translate-x-1/2">
                    <a class="text-slate-500 hover:text-[#D4AF37] transition-opacity duration-200" href="#">Privacy</a>
                    <a class="text-slate-500 hover:text-[#D4AF37] transition-opacity duration-200" href="#">Terms</a>
                    <a class="text-slate-500 hover:text-[#D4AF37] transition-opacity duration-200" href="#">AI Ethics</a>
                </div>
                <div class="mt-2 md:mt-0 flex gap-3">
                    <div class="w-6 h-6 rounded-full flex items-center justify-center bg-surface-container-high border border-outline-variant/10 hover:border-primary/40 transition-colors">
                        <span class="material-symbols-outlined text-xs text-primary">public</span>
                    </div>
                    <div class="w-6 h-6 rounded-full flex items-center justify-center bg-surface-container-high border border-outline-variant/10 hover:border-primary/40 transition-colors">
                        <span class="material-symbols-outlined text-xs text-primary">terminal</span>
                    </div>
                </div>
            </div>
        </footer>
        `;
    }
}

customElements.define("app-footer", Footer);
