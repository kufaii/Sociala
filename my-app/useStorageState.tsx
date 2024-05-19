import * as SecureStore from 'expo-secure-store';
import * as React from 'react';
import { Platform } from 'react-native';
import { useEffect, useReducer, useCallback } from "react"

// mendefinisikan generic type
type UseStateHook<T> = [[boolean, T | null], (value: T | null) => void];

// set type async state
function useAsyncState<T>(
    initialValue: [boolean, T | null] = [true, null],
): UseStateHook<T> {
    return useReducer(
        (state: [boolean, T | null], action: T | null = null): [boolean, T | null] => [false, action],
        initialValue
    ) as UseStateHook<T>;
}

// set storage
export async function setStorageItemAsync(key: string, value: string | null) {
    if (value == null) {
        await SecureStore.deleteItemAsync(key);
    } else {
        await SecureStore.setItemAsync(key, value);
    }
}

export function useStorageState(key: string): UseStateHook<string> {
    // Public
    const [state, setState] = useAsyncState<string>();

    // mengambil value yang telah di set pada local storage
    useEffect(() => {
        SecureStore.getItemAsync(key).then(value => {
            setState(value);
        });
    }, [key]);

    // menyimpan value ke local storage
    const setValue = useCallback(
        (value: string | null) => {
            setState(value);
            console.log({ key, value }, " < Key Value > ")
            setStorageItemAsync(key, value);
        },
        [key]
    );

    return [state, setValue];
}
