import { useEffect, useState } from "react"
import routerList from "../data/routers.json"

// Swap data hook

function useSwap(chain) {
    // Swap state data

    const [ tokenIn, setTokenIn ] = useState()
    const [ tokenInAmount, setTokenInAmount ] = useState()
    const [ tokenOut, setTokenOut ] = useState()
    const [ tokenOutAmount, setTokenOutAmount ] = useState()
    const [ routers, setRouters ] = useState(routerList)

    // Default swap store

    function getDefault() {
        return {
            tokenIn: chain.tokens.find(token => token.symbol === chain.token),
            tokenOut: null
        }
    }

    // Run initial client side update

    useEffect(() => {
        // Initialize swap store

        if (!localStorage.swapStore) {
            localStorage.swapStore = JSON.stringify({ [chain.id]: getDefault() })
        } else {
            try {
                const store = JSON.parse(localStorage.swapStore)
                if (!store[chain.id]) store[chain.id] = getDefault()
                localStorage.swapStore = JSON.stringify(store)
            } catch {
                localStorage.swapStore = JSON.stringify({ [chain.id]: getDefault() })
            }
        }

        // Initialize swap data

        const store = JSON.parse(localStorage.swapStore)[chain.id]
        setTokenIn(store.tokenIn)
        setTokenOut(store.tokenOut)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // Update local storage on token change

    useEffect(() => {
        if (!localStorage.swapStore) {
            localStorage.swapStore = JSON.stringify({
                [chain.id]: {
                    tokenIn,
                    tokenOut
                }
            })
        } else {
            try {
                const store = JSON.parse(localStorage.swapStore)
                store[chain.id] = {
                    tokenIn,
                    tokenOut
                }
                localStorage.swapStore = JSON.stringify(store)
            } catch {
                localStorage.swapStore = JSON.stringify({
                    [chain.id]: {
                        tokenIn,
                        tokenOut
                    }
                })
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tokenIn, tokenOut])

    // Swap data

    return {
        tokenIn,
        setTokenIn,
        tokenInAmount,
        setTokenInAmount,
        tokenOut,
        setTokenOut,
        tokenOutAmount,
        setTokenOutAmount,
        routers,
        setRouters
    }
}

// Exports

export default useSwap