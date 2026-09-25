# BioPair — DNA & RNA Base Pairing & Codon Translator

A modern, high-school-friendly educational web application built with **React**, **TypeScript**, and **Tailwind CSS**.

---

## 🧬 Biological Core Concepts

### 1. DNA Complementary Base Pairing (Replication)
In DNA, nitrogenous bases always pair via hydrogen bonds according to **Chargaff's Rules**:
* **Adenine (A)** pairs with **Thymine (T)** (2 hydrogen bonds)
* **Guanine (G)** pairs with **Cytosine (C)** (3 hydrogen bonds)

> Example:
> Input DNA: `AGCTAGC` (5' → 3')  
> Complement: `TCGATCG` (3' → 5')

### 2. RNA Transcription (DNA → mRNA)
During transcription, RNA polymerase creates a messenger RNA (mRNA) strand from the DNA template. **Thymine does not exist in RNA**; it is replaced by **Uracil (U)**:
* **Adenine (A)** in DNA pairs with **Uracil (U)** in RNA
* **Thymine (T)** in DNA pairs with **Adenine (A)** in RNA
* **Guanine (G)** pairs with **Cytosine (C)**
* **Cytosine (C)** pairs with **Guanine (G)**

> Example:
> Input DNA: `AGCTAGC`  
> RNA Transcript: `UCGAUCG`

---

## 📂 Senior Developer Folder Structure

The project follows a clean, decoupled architecture where business logic is strictly separated from presentation:

```text
src/
├── types/                      # TypeScript domain models and contracts
│   ├── biology.ts              # Base types, base metadata, paired character, analysis
│   └── navigation.ts           # Navigation tab types
│
├── constants/                  # Single sources of biological truth
│   ├── basePairs.ts            # Base definitions, H-bond counts, colors, word mappings
│   ├── geneticCode.ts          # Complete 64-codon table & 20 amino acid properties
│   └── sampleSequences.ts      # One-click test samples (e.g., AGCTAGC, Adenine, Telomere)
│
├── utils/                      # Pure, testable computational logic
│   ├── complement.ts           # DNA/RNA complementary pairing & word detection algorithms
│   ├── translator.ts           # mRNA triplet codon to amino acid translation
│   └── formatters.ts           # Clipboard copying, chunk formatting, melting temperature
│
├── hooks/                      # Custom React hooks (clean state separation)
│   ├── useBioConverter.ts      # Orchestrates input state, pairing analysis, and translation
│   └── useClipboard.ts         # Handles copy-to-clipboard state with visual feedback
│
├── components/                 # Reusable, modular UI components
│   ├── common/                 # Primitives (Badge, Button, Card, TabGroup)
│   ├── layout/                 # Page shell (Navbar, Footer)
│   ├── pairing/                # SequenceInput, SingleWordLookup, SequenceResultBox
│   └── translation/            # CodonTranslatorView, CodonReferenceTable
│
├── App.tsx                     # Top-level view composition
├── main.tsx                    # Vite React entry point
└── index.css                   # Tailwind CSS styling and theme setup
```

---

## 🚀 How to Interact with the Website

1. **Word Lookup Mode**:
   * Type full chemical base names like `Adenine`, `Thymine`, `Guanine`, `Cytosine`, or `Uracil` in the search bar.
   * An interactive **Single Base Pair Spotlight** card immediately appears showing:
     * Direct DNA partner (e.g. Adenine → Thymine)
     * Direct RNA partner (e.g. Adenine → Uracil)
     * Hydrogen bond count (2 vs 3 bonds)
     * Structural ring class (Purine double-ring vs Pyrimidine single-ring)

2. **Sequence Mode**:
   * Type any nucleotide sequence (e.g. `AGCTAGC`).
   * The app automatically calculates:
     * **DNA Complement**: `TCGATCG`
     * **RNA Transcript**: `UCGAUCG`
     * **GC-Content percentage**
   * Click **Copy DNA** or **Copy RNA** to copy the strand directly to your clipboard.

3. **Codon Translator Tab**:
   * Switch to the **Codon Translator** tab.
   * Translates 3-base mRNA codons into a visual peptide bead chain (e.g., `AUG` → Methionine).
   * Identifies **Start Codons (AUG)** and **Stop Codons (UAA, UAG, UGA)**.
   * Includes a searchable, filterable **64-Codon Genetic Code Reference Table**.

---

## 🛠️ How It Was Built

* **Framework**: React 19 + TypeScript (Strict Type Safety, zero `any`)
* **Styling**: Tailwind CSS v4 + sleek glassmorphic modern dark theme
* **Build Tool**: Vite (Instant Hot Module Replacement & fast compilation)
* **Icons**: `lucide-react` for clean, scientific iconography
* **Architecture Philosophy**:
  * **Not over-engineered**: Pure TypeScript helper functions, standard React state hooks, zero unnecessary state library overhead.
  * **Highly readable**: Clear folders so any developer or teacher can inspect the code.

---

## 💻 Local Development Commands

```bash
# 1. Install dependencies
npm install

# 2. Start local development server
npm run dev

# 3. Build optimized production bundle
npm run build
```
