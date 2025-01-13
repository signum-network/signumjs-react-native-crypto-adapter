import {StyleSheet, Image, Platform, TextInput, Button} from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import {ThemedText} from '@/components/ThemedText';
import {ThemedView} from '@/components/ThemedView';
import {IconSymbol} from '@/components/ui/IconSymbol';
import {decryptMessage, generateSignKeys, getAccountIdFromPublicKey, SignKeys} from "@signumjs/crypto"
import {useState} from "react";
import {
    isAttachmentVersion,
    LedgerClientFactory,
    Transaction,
} from "@signumjs/core"

const SignumClient = LedgerClientFactory.createClient({
    nodeHost: "https://europe3.testnet.signum.network"
})

async function decryptOnChainMessage(tx: Transaction, keys: SignKeys): Promise<string> {
    if (!isAttachmentVersion(tx, "EncryptedMessage")) {
        throw new Error("Transaction has no encrypted attachment")
    }
    const accountId = getAccountIdFromPublicKey(keys.publicKey)

    // decrypt as recipient
    if(accountId === tx.recipient) {
        return decryptMessage(tx.attachment.encryptedMessage, tx.senderPublicKey, keys.agreementPrivateKey)
    }

    // decrypt own sent message
    if(accountId === tx.sender) {
        const recipient = await SignumClient.account.getAccount({accountId: tx.recipient!})
        return decryptMessage(tx.attachment.encryptedMessage, recipient.publicKey, keys.agreementPrivateKey)
    }

    throw new Error("Could not decrypt encrypted attachment")
}

export default function DecryptScreen() {
    const [transactionId, setTransactionId] = useState('');
    const [mnemonic, setMnemonic] = useState('');
    const [result, setResult] = useState('');
    const [isDecrypting, setIsDecrypting] = useState(false);

    const handleOnDecrypt = async () => {
        try {
            setIsDecrypting(true);
            const tx = await SignumClient.transaction.getTransaction(transactionId)
            const keys = generateSignKeys(mnemonic.trim())
            const plaintext = await decryptOnChainMessage(tx, keys);
            setResult(plaintext)
        } catch (error: any) {
            setResult("FAILED:" + error.message);
        } finally {
            setIsDecrypting(false);
        }
    }

    const canDecrypt = transactionId.length > 0 && mnemonic.length > 0;

    return (
        <ParallaxScrollView
            headerBackgroundColor={{light: '#D0D0D0', dark: '#353636'}}
            headerImage={
                <IconSymbol
                    size={310}
                    color="#808080"
                    name="chevron.left.forwardslash.chevron.right"
                    style={styles.headerImage}
                />
            }>
            <ThemedView style={styles.titleContainer}>
                <ThemedText type="title">Decrypt</ThemedText>
            </ThemedView>
            <ThemedView style={styles.stepContainer}>
                <ThemedText style={styles.placeholder}>Select a transaction from TESTNET (using its Id) with encrypted
                    P2P message and enter the senders keys (by using their mnemonic)</ThemedText>
            </ThemedView>
            <TextInput
                id="txId"
                style={styles.input}
                onChangeText={setTransactionId}
                value={transactionId}
                placeholder="Enter transaction id"
            />
            <ThemedView style={styles.stepContainer}>
                <TextInput
                    id="mnemonic"
                    style={styles.input}
                    onChangeText={setMnemonic}
                    value={mnemonic}
                    placeholder="Enter mnemonic"
                />
            </ThemedView>
            <ThemedView style={styles.stepContainer}>
                <Button title="Decrypt On-Chain Message" onPress={handleOnDecrypt} disabled={!canDecrypt}/>
                {isDecrypting && (
                    <ThemedText style={styles.placeholder}>Decrypting...</ThemedText>
                )}
                {!isDecrypting && result ? (
                    <ThemedText style={styles.result}>{result}</ThemedText>
                ) : (
                    <ThemedText style={styles.placeholder}>The result will appear here</ThemedText>
                )}
            </ThemedView>
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
    stepContainer: {
        gap: 8,
        marginBottom: 8,
    },
    input: {
        width: '100%',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        paddingHorizontal: 10,
    },
    result: {
        fontSize: 16,
        textAlign: 'left'
    },
    placeholder: {
        fontSize: 16,
        color: 'gray',
        textAlign: 'center',
    },
});
