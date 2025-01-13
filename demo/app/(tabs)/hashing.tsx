import {StyleSheet, Image, Platform, TextInput} from 'react-native';

import {Collapsible} from '@/components/Collapsible';
import {ExternalLink} from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import {ThemedText} from '@/components/ThemedText';
import {ThemedView} from '@/components/ThemedView';
import {IconSymbol} from '@/components/ui/IconSymbol';
import {generateMnemonic, sha256AsHex} from "@signumjs/crypto"
import {useState} from "react";

export default function HashingScreen() {
    const [input, setInput] = useState('');

    return (
        <ParallaxScrollView
            headerBackgroundColor={{light: '#D0D0D0', dark: '#353636'}}
            headerImage={
                <IconSymbol
                    size={310}
                    color="#808080"
                    name="tag.fill"
                    style={styles.headerImage}
                />
            }>
            <ThemedView style={styles.titleContainer}>
                <ThemedText type="title">SHA256 Hashing</ThemedText>
            </ThemedView>
            <TextInput
                style={styles.input}
                onChangeText={setInput}
                value={input}
                placeholder="Enter text to hash"
            />
            {input ? (
                <ThemedText style={styles.hash}>{sha256AsHex(input, 'utf8')}</ThemedText>
            ) : (
                <ThemedText style={styles.placeholder}>Hash will appear here</ThemedText>
            )}
        </ParallaxScrollView>
    );
}

const styles = StyleSheet.create({
    headerImage: {
        color: '#808080',
        bottom: -90,
        left: -35,
        position: 'absolute',
    },
    titleContainer: {
        flexDirection: 'row',
        gap: 8,
    },
    input: {
        width: '100%',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        paddingHorizontal: 10,
    },
    hash: {
        fontSize: 16,
        textAlign: 'center',
    },
    placeholder: {
        fontSize: 16,
        color: 'gray',
    },
});
