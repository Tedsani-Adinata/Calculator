// Kelas Kalkulator untuk menangani seluruh logika
class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear();
    }

    // Mengosongkan memori dan layar
    clear() {
        this.currentOperand = '0';
        this.previousOperand = '';
        this.operation = undefined;
    }

    // Menghapus satu angka dari belakang
    delete() {
        if (this.currentOperand === 'Error') {
            this.clear();
            return;
        }
        if (this.currentOperand.length === 1 || (this.currentOperand.length === 2 && this.currentOperand.startsWith('-'))) {
            this.currentOperand = '0';
        } else {
            this.currentOperand = this.currentOperand.toString().slice(0, -1);
        }
    }

    // Menambahkan angka ke layar
    appendNumber(number) {
        if (this.currentOperand === 'Error') this.clear();
        
        // Mencegah lebih dari satu titik desimal
        if (number === '.' && this.currentOperand.includes('.')) return;
        
        // Mengganti 0 di awal (kecuali jika diikuti desimal)
        if (this.currentOperand === '0' && number !== '.') {
            this.currentOperand = number.toString();
        } else {
            this.currentOperand = this.currentOperand.toString() + number.toString();
        }
    }

    // Memilih operator matematika
    chooseOperation(operation) {
        if (this.currentOperand === 'Error') return;
        if (this.currentOperand === '') return;
        
        // Jika sudah ada perhitungan sebelumnya, kalkulasi terlebih dahulu
        if (this.previousOperand !== '') {
            this.compute();
        }
        
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }

    // Melakukan perhitungan
    compute() {
        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        
        if (isNaN(prev) || isNaN(current)) return;
        
        switch (this.operation) {
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case '×':
                computation = prev * current;
                break;
            case '÷':
                // Penanganan pembagian dengan nol
                if (current === 0) {
                    this.currentOperand = 'Error';
                    this.operation = undefined;
                    this.previousOperand = '';
                    return;
                }
                computation = prev / current;
                break;
            default:
                return;
        }
        
        // Mencegah presisi floating point yang tidak akurat (misal 0.1 + 0.2)
        computation = Math.round(computation * 10000000000) / 10000000000;
        
        this.currentOperand = computation.toString();
        this.operation = undefined;
        this.previousOperand = '';
    }

    // Memformat angka dengan pemisah ribuan agar mudah dibaca
    getDisplayNumber(number) {
        if (number === 'Error') return number;
        if (number === '') return '';
        if (number === '-') return '-';
        
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];
        
        let integerDisplay;
        if (isNaN(integerDigits)) {
            integerDisplay = '';
        } else {
            // Menggunakan format en-US agar ribuan dipisah dengan koma, dan desimal tetap titik
            integerDisplay = integerDigits.toLocaleString('en-US', { maximumFractionDigits: 0 });
        }
        
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`;
        } else {
            return integerDisplay;
        }
    }

    // Mengupdate tampilan antarmuka
    updateDisplay(isEqualsPop = false) {
        // Fix bug baris angka kosong
        if (this.currentOperand === '') {
            this.currentOperandTextElement.innerText = '0';
        } else {
            this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand);
        }

        if (this.operation != null) {
            this.previousOperandTextElement.innerText = 
                `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`;
        } else {
            this.previousOperandTextElement.innerText = '';
        }

        // Jalankan animasi display
        this.currentOperandTextElement.classList.remove('animate-update', 'animate-pop');
        void this.currentOperandTextElement.offsetWidth; // Trigger reflow
        if (isEqualsPop && this.currentOperand !== 'Error' && this.currentOperand !== '') {
            this.currentOperandTextElement.classList.add('animate-pop');
        } else {
            this.currentOperandTextElement.classList.add('animate-update');
        }
    }
}

// Menangkap elemen dari DOM
const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operator]');
const equalsButton = document.querySelector('#btn-equals');
const deleteButton = document.querySelector('#btn-delete');
const clearButton = document.querySelector('#btn-clear');
const previousOperandTextElement = document.querySelector('#previous-operand');
const currentOperandTextElement = document.querySelector('#current-operand');

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

// Event Listeners untuk klik mouse
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.dataset.number);
        calculator.updateDisplay();
    });
});

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.dataset.operator);
        calculator.updateDisplay();
    });
});

const paywallModal = document.getElementById('paywall-modal');
const closePaywallBtn = document.getElementById('close-modal');

function attemptCompute() {
    const userTier = localStorage.getItem('calc_tier');
    const op = calculator.operation;
    
    if (op == null) {
        calculator.compute();
        calculator.updateDisplay(true);
        return;
    }
    
    if (userTier === 'tier2') {
        calculator.compute();
        calculator.updateDisplay(true);
        return;
    }
    
    if (userTier === 'tier1') {
        if (op === '×' || op === '÷') {
            paywallModal.classList.remove('hidden');
            return;
        }
        calculator.compute();
        calculator.updateDisplay(true);
        return;
    }
    
    // No tier (Free) -> Show paywall
    paywallModal.classList.remove('hidden');
}

// Subscribe Buttons on Paywall (Direct Mock Success)
document.querySelectorAll('.plan-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        let selectedTier = null;
        if (e.target.classList.contains('primary-btn')) {
            selectedTier = 'tier2';
        } else if (e.target.classList.contains('secondary-btn')) {
            selectedTier = 'tier1';
        } else {
            return;
        }
        
        localStorage.setItem('calc_tier', selectedTier);
        paywallModal.classList.add('hidden');
        alert(`Berhasil berlangganan! Akses ${selectedTier === 'tier2' ? 'Premium (Kali/Bagi)' : 'Basic (Tambah/Kurang)'} telah terbuka.`);
        
        calculator.compute();
        calculator.updateDisplay(true);
    });
});

closePaywallBtn.addEventListener('click', () => {
    paywallModal.classList.add('hidden');
});

equalsButton.addEventListener('click', () => {
    attemptCompute();
});

clearButton.addEventListener('click', () => {
    calculator.clear();
    calculator.updateDisplay();
});

deleteButton.addEventListener('click', () => {
    calculator.delete();
    calculator.updateDisplay();
});

// Helper function untuk memberikan efek "active" / tertekan pada tombol
function clickButtonAndAnimate(selector) {
    const btn = document.querySelector(selector);
    if (btn) {
        btn.classList.add('active');
        // Menghapus kelas 'active' setelah durasi yang pas dengan animasi
        setTimeout(() => btn.classList.remove('active'), 100);
    }
}

// Event Listeners untuk input Keyboard
document.addEventListener('keydown', e => {
    // Mencegah scroll dan perilaku bawaan saat menekan Space/Enter
    if (['Enter', 'Backspace', 'Escape', ' '].includes(e.key)) {
        e.preventDefault();
    }

    // Tombol angka
    if (e.key >= 0 && e.key <= 9) {
        clickButtonAndAnimate(`[data-number="${e.key}"]`);
        calculator.appendNumber(e.key);
        calculator.updateDisplay();
    }
    // Titik desimal
    if (e.key === '.' || e.key === ',') {
        clickButtonAndAnimate(`[data-number="."]`);
        calculator.appendNumber('.');
        calculator.updateDisplay();
    }
    // Sama dengan / Enter
    if (e.key === '=' || e.key === 'Enter') {
        clickButtonAndAnimate('#btn-equals');
        attemptCompute();
    }
    // Delete / Backspace
    if (e.key === 'Backspace') {
        clickButtonAndAnimate('#btn-delete');
        calculator.delete();
        calculator.updateDisplay();
    }
    // Clear (Esc)
    if (e.key === 'Escape') {
        clickButtonAndAnimate('#btn-clear');
        calculator.clear();
        calculator.updateDisplay();
    }
    // Operator
    if (e.key === '+' || e.key === '-') {
        clickButtonAndAnimate(`[data-operator="${e.key}"]`);
        calculator.chooseOperation(e.key);
        calculator.updateDisplay();
    }
    if (e.key === '*' || e.key === 'x' || e.key === 'X') {
        clickButtonAndAnimate(`[data-operator="×"]`);
        calculator.chooseOperation('×');
        calculator.updateDisplay();
    }
    if (e.key === '/') {
        clickButtonAndAnimate(`[data-operator="÷"]`);
        calculator.chooseOperation('÷');
        calculator.updateDisplay();
    }
});
