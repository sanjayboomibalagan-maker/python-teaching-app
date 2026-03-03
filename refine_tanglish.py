import os
import re

lessons_dir = r"c:\Users\Sanjay\OneDrive\Desktop\backup\27-02-26\lessons"
index_file = r"c:\Users\Sanjay\OneDrive\Desktop\backup\27-02-26\index.html"

# Common Tanglish spelling/grammar fixes
replacements = {
    r'thirakaama': 'thirakkama',
    r'purinjitha': 'purinjiducha',
    r'purinjathi': 'purinjatha',
    r'pannuvaa': 'pannuva',
    r'solluvaa': 'solluva',
    r'kuduka': 'kudukka',
    r'eduka': 'edukka',
    r'vaika': 'vaikka',
    r'irukunu': 'irukkunnu',
    r'irukum': 'irukkum',
    r'mathiram': 'mattum',
    r'aprom': 'apparam',
    r'kathuthukittu': 'kathukkittu',
    r'pannaatha': 'pannathinga',
    r'purinjithunnu': 'purinjiducha-nu',
    r'kathukittiga': 'kathukittingala',
    r'nadakum': 'nadakkum',
    r'kidaikura': 'kidaikkura',
    r'kedaikura': 'kidaikkura',
    r'purila': 'puriyala',
    r'sollaatha': 'sollathinga',
    r'irundu': 'irundhu',
    r'kathukka': 'kathukka',
    r'pannuvaa': 'pannuva',
    r'solluvaa': 'solluva',
    r'vaanga': 'vaanga',
    r'edukka': 'edukka',
    r'kudukka': 'kudukka',
    r'vachikalaam': 'vachikkalam',
    r'thalaivarey': 'thalaivare',
    r'purinjiducha': 'purinjiducha',
    r'kathukkalaam': 'kathukalam',
}

files_to_update = [os.path.join(lessons_dir, f) for f in os.listdir(lessons_dir) if f.endswith(".html")]
files_to_update.append(index_file)

for filepath in files_to_update:
    if os.path.exists(filepath):
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        new_content = content
        for pattern, replacement in replacements.items():
            new_content = re.sub(pattern, replacement, new_content, flags=re.IGNORECASE)
        
        if new_content != content:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"Refined Tanglish in {os.path.basename(filepath)}")
