import {Image, StyleSheet, Platform, Button} from 'react-native';

import {HelloWave} from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import {ThemedText} from '@/components/ThemedText';
import {ThemedView} from '@/components/ThemedView';
import {useState} from "react";
import {generateMnemonic} from "@signumjs/crypto";
import {IconSymbol} from "@/components/ui/IconSymbol";

export default function MnemonicScreen() {
    const [mnemonic, setMnemonic] = useState('');

    const onGenerateMnemonic = () => {
        setMnemonic(generateMnemonic());
    }

    return (
        <ParallaxScrollView
            headerBackgroundColor={{light: '#D0D0D0', dark: '#353636'}}
            headerImage={
                <IconSymbol
                    size={310}
                    color="#808080"
                    name="shuffle"
                    style={styles.headerImage}
                />
            }>
            <ThemedView style={styles.titleContainer}>
                <ThemedText type="title">Crypto Sandbox</ThemedText>
                <HelloWave/>
            </ThemedView>
            <ThemedView style={styles.stepContainer}>
                <ThemedText type="subtitle">This tiny app demonstrates the @signumjs/crypto functionalities</ThemedText>
            </ThemedView>
            <ThemedView style={styles.stepContainer}>
                <Button title="Generate Mnemonic" onPress={onGenerateMnemonic}/>
                {mnemonic ? (
                    <ThemedText style={styles.mnemonic}>{mnemonic}</ThemedText>
                ) : (
                    <ThemedText style={styles.placeholder}>Your mnemonic will appear here</ThemedText>
                )}
            </ThemedView>
        </ParallaxScrollView>
    );
}

const styles = StyleSheet.create({
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'stretch',
        gap: 8,
    },
    stepContainer: {
        gap: 8,
        marginBottom: 8,
    },
    headerImage: {
        color: '#808080',
        bottom: -90,
        left: -35,
        position: 'absolute',
    },
    mnemonic: {
        marginTop: 20,
        fontSize: 18,
        fontFamily: 'SpaceMono',
        textAlign: 'justify',
    },
    placeholder: {
        marginTop: 20,
        fontSize: 16,
        color: 'gray',
    },
});
