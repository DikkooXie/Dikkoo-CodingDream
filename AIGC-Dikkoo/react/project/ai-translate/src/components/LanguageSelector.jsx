const LANGUAGES = {
    "Acehnese (Arabic script)": "ace_Arab",
    "Acehnese (Latin script)": "ace_Latn",
    "Afrikaans": "afr_Latn",
    "Akan": "aka_Latn",
    "Amharic": "amh_Ethi",
    "Armenian": "hye_Armn",
    "Assamese": "asm_Beng",
    "Asturian": "ast_Latn",
    "Awadhi": "awa_Deva",
    "Ayacucho Quechua": "quy_Latn",
    "Balinese": "ban_Latn",
    "Bambara": "bam_Latn",
    "Banjar (Arabic script)": "bjn_Arab",
    "Banjar (Latin script)": "bjn_Latn",
    "Bashkir": "bak_Cyrl",
    "Basque": "eus_Latn",
    "Belarusian": "bel_Cyrl",
    "Bemba": "bem_Latn",
    "Bengali": "ben_Beng",
    "Bhojpuri": "bho_Deva",
    "Bosnian": "bos_Latn",
    "Buginese": "bug_Latn",
    "Bulgarian": "bul_Cyrl",
    "Burmese": "mya_Mymr",
    "Catalan": "cat_Latn",
    "Cebuano": "ceb_Latn",
    "Chinese (Simplified)": "zho_Hans",
    "English": "eng_Latn",
    "French": "fra_Latn",
}

const LanguageSelector = (props) => {
    
    // 解构父组件传递的 props
    const { 
        type, 
        defaultLanguage, 
        onChange 
    } = props

    return (
        <div className="language-selector">
            <label>{type}</label>
            <select 
                onChange={onChange} 
                defaultValue={defaultLanguage}
            >
                { 
                // react 没有 v-for，使用 Object.entries() 生成数组，再使用 map() 方法进行遍历
                Object.entries(LANGUAGES).map(([key, value]) => {
                    return (
                    <option 
                        key={key} 
                        value={value}
                    >
                        { key }
                    </option>
                    )
                })
                }
            </select>
        </div>
    )
}

export default LanguageSelector;