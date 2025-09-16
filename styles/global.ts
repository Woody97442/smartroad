// styles/global.ts

import { StyleSheet } from 'react-native';

export const globalStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: 'white',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 15,
        borderRadius: 5,
        width: '100%',
    },
    error: {
        color: 'red',
        marginBottom: 15,
    },
    link: {
        color: 'blue',
        textAlign: 'center',
        marginTop: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 18,
        marginBottom: 20,
    },
    logo: { width: 200, height: 200, marginBottom: 20 },
    card: {
        padding: 15,
        borderRadius: 10,
        backgroundColor: "#f0f0f0",
        marginBottom: 15,
    },
    button: {
        backgroundColor: '#007AFF',
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 8,
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: 20,
        width: '100%',
    },
    buttonText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: '600',
    },
});

export const headerStyles = StyleSheet.create({
    title_logo: {
        fontWeight: "bold",
        fontSize: 20,
        color: "black",
    },
    sb_title_logo: {
        fontWeight: "bold",
        fontSize: 10,
        color: "gray",
    },
    header: {
        height: 60,
        flexDirection: "row",
        paddingHorizontal: 15,
        alignItems: "center",
        justifyContent: "space-between",
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
        backgroundColor: "#fff",
        zIndex: 100,
    },
    logoContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    logo: { width: 40, height: 40, resizeMode: "contain", marginRight: 10 },
    userInfo: { flexDirection: "row", alignItems: "center" },
    userName: { marginRight: 10, fontWeight: "600", fontSize: 16 },
    avatar: { width: 40, height: 40, borderRadius: 20 },
    menu: {
        position: "absolute",
        top: 50,
        right: 0,
        width: 150,
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5,
        zIndex: 1000,
    },
    menuItem: { padding: 10 },
    safeArea: {
        backgroundColor: "#fff",
        zIndex: 100,
    },
});