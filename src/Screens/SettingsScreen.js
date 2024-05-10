import React, { useContext, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet,ScrollView, SafeAreaView } from 'react-native';
import { ThemeContext } from "../../contexts/ThemeContext";
import { myColors as color } from "../Utils/MyColors";
import { AntDesign } from '@expo/vector-icons';
import i18next from 'i18next'
import Logo from '../Components/Logo'
import { useTranslation } from 'react-i18next'; // For text translation

const ThemeOptions = [
    { label: 'Light', value: 'light' },
    { label: 'Dark', value: 'dark' },
    { label: 'Automatic', value: 'automatic' },
];

const LanguageOptions = [
    { label: 'English', value: 'en' },
    { label: 'Arabic', value: 'ar' },
    { label: 'Hebrew', value: 'he' },
];

const SettingsScreen = () => {
    const { t } = useTranslation(); // Initialize the useTranslation hook
    const [theme, setTheme] = useContext(ThemeContext);
    let myColors = color[theme.mode];
    const [selectedTheme, setSelectedTheme] = useState('automatic');
    const [selectedLanguage, setSelectedLanguage] = useState(i18next.language); // Use i18next's current language
    const [showLanguageMenu, setShowLanguageMenu] = useState(false);

    const handleThemeChange = (value) => {
        setSelectedTheme(value);
        setTheme({ mode: value });
    };

    const handleLanguageChange = (value) => {
        setSelectedLanguage(value);
        i18next.changeLanguage(value); // Change language with i18next
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: myColors.primary }]}>

            <Logo/>
            <ScrollView style={styles.container}>
                <View style={styles.section}>
                    <Text style={[styles.sectionTitle , {color: myColors.text}]}>{t('theme')}</Text>
                    <View style={styles.buttonsContainer}>
                        {ThemeOptions.map(option => (
                            <TouchableOpacity
                                key={option.value}
                                style={[styles.button, { backgroundColor: selectedTheme === option.value ? myColors.clickable : myColors.primary }]}
                                onPress={() => handleThemeChange(option.value)}
                            >
                                <Text style={[styles.buttonText, {color: myColors.text}]}>{t(option.label)}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                <View style={styles.section}>
                    <TouchableOpacity
                        style={styles.languageHeader}
                        onPress={() => setShowLanguageMenu(!showLanguageMenu)}
                    >
                        <Text style={[styles.sectionTitle, {color:myColors.text}]}>{t('language')}</Text>
                        <AntDesign name={showLanguageMenu ? "caretup" : "caretdown"} size={20} color={myColors.text} />
                    </TouchableOpacity>
                    {showLanguageMenu && (
                        <View style={styles.buttonsContainer}>
                            {LanguageOptions.map(option => (
                                <TouchableOpacity
                                    key={option.value}
                                    style={[styles.button, { backgroundColor: selectedLanguage === option.value ? myColors.clickable : myColors.primary }]}
                                    onPress={() => handleLanguageChange(option.value)}
                                >
                                    <Text style={[styles.buttonText,{color: myColors.text}]}>{t(option.label)}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    )}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
    },

    section: {
        marginBottom: 50,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
    },
    button: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        marginBottom: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        fontSize: 16,
    },
    languageHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
});

export default SettingsScreen;
