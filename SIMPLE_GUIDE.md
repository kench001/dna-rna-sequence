# BioPair — Simple Project Guide & Tutorial
*An easy, non-technical explanation for teachers, students, and reviewers.*

---

## 💡 What is This Project?

**BioPair** is a smart digital science tool. 

When you type a biology word or genetic letter, it instantly shows you its **natural matching partner** based on the real laws of nature.

* **In DNA:**
  * **Adenine** always pairs with **Thymine**
  * **Guanine** always pairs with **Cytosine**
* **In RNA:**
  * **Adenine** pairs with **Uracil** (because Thymine does not exist in RNA)
  * **Guanine** pairs with **Cytosine**

---

## 🛠️ How Was It Built? (The 3 Simple Parts)

Think of this project like building an interactive board game with **three simple pieces**:

### 1. The Rulebook (The Memory)
* Just like a dictionary, we created a list of rules that teaches the computer nature's pairing laws:
  * $A \leftrightarrow T$ (DNA)
  * $A \rightarrow U$ (RNA)
  * $G \leftrightarrow C$ (Both)
* It also knows how many **hydrogen bonds** connect them (2 bonds for A-T, 3 bonds for G-C).

### 2. The Word Detective (The Brain)
* When you type in the box, the Detective reads your text.
* It can read **single words** (like `Adenine`), **multiple words** (like `Cytosine Adenine`), or **letter codes** (like `AGCTAGC`).
* It checks the Rulebook and instantly hands over the exact matching partner for each one.

### 3. The Display Screen (The Look)
* Beautiful cards with colors for each base:
  * 🟢 **Green** for Adenine
  * 🟡 **Yellow** for Thymine
  * 🔵 **Cyan** for Guanine
  * 🟣 **Purple** for Cytosine
  * 🔴 **Red** for Uracil
* Clear "Copy" buttons so students can copy answers into homework or presentations with one click.

---

## 📖 How to Use the Website (Quick Tutorial)

### Example 1: Type a Single Word
1. Click the input box.
2. Type: **`Adenine`**
3. **What happens:** A spotlight card pops up showing:
   * DNA Partner: **Thymine** (2 bonds)
   * RNA Partner: **Uracil** (2 bonds)

### Example 2: Type Multiple Words
1. Type: **`Cytosine Adenine`**
2. **What happens:** The app reads both words and gives you the exact matching words:
   * **DNA Words:** `Guanine Thymine`
   * **RNA Words:** `Guanine Uracil`

### Example 3: Type a Sequence of Letters
1. Type: **`AGCTAGC`**
2. **What happens:**
   * **DNA Strand:** `TCGATCG`
   * **RNA Strand:** `UCGAUCG`

### Example 4: Codon Translator Tab
1. Click the **"Codon Translator"** tab at the top.
2. Enter letters like **`AUGGCCUAA`**.
3. It translates every 3-letter genetic word into its real **protein building block (Amino Acid)**!

---

## 🚀 How to Start the Website on Any Computer

You only need 2 quick steps:

1. **Start the project:**  
   Open your command prompt in this project folder and type:
   ```bash
   npm run dev
   ```
2. **Open your browser:**  
   Hold `Ctrl` and click the link on your screen:
   ```text
   http://localhost:5173/
   ```
   *The website will open and is ready to use!*
