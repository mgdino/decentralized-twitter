import { createContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useAuth } from '@lib/context/auth-context';




export const connectWallet = async () => {
    // const { signInWithGoogle } = useAuth();
    // const [currentAccount, setCurrentAccount] = useState('')
// const [currentUser, setCurrentUser] = useState({})
// const router = useRouter()
    // if (!window.ethereum) return setAppStatus('noMetaMask')
    var user
    console.log("g")
    try {
    console.log("gg")
      const addressArray = await window.ethereum.request({
        method: 'eth_requestAccounts',
      })

      console.log(addressArray)
    //   router.push('/g')
      if (addressArray.length > 0) {
        // setCurrentAccount(addressArray[0])
        console.log(addressArray[0])
        user = addressArray[0]
        // signInWithGoogle()
      } else {
        // router.push('/')

      }
    } catch (err) {

    }

    return user

}
  

// export const TwitterWallet = () => {
//     const [currentAccount, setCurrentAccount] = useState('')
// const [currentUser, setCurrentUser] = useState({})
// const router = useRouter()


//   useEffect(() => {
//     checkIfWalletIsConnected()
//   }, [])

//   useEffect(() => {
//     if (!currentAccount && appStatus == 'connected') return
//   }, [currentAccount, appStatus])

//   /**
//    * Checks if there is an active wallet connection
//    */
//   const checkIfWalletIsConnected = async () => {
//     if (!window.ethereum) return setAppStatus('noMetaMask')
//     try {
//       const addressArray = await window.ethereum.request({
//         method: 'eth_accounts',
//       })
//       if (addressArray.length > 0) {
//         setAppStatus('connected')
//         setCurrentAccount(addressArray[0])
//       } else {
//         router.push('/')
//         setAppStatus('notConnected')
//       }
//     } catch (err) {
//       router.push('/')
//       setAppStatus('error')
//     }
//   }

//   /**
//    * Initiates MetaMask wallet connection
//    */
//   const connectWallet = async () => {
//     // if (!window.ethereum) return setAppStatus('noMetaMask')
//     try {
//       setAppStatus('loading')

//       const addressArray = await window.ethereum.request({
//         method: 'eth_requestAccounts',
//       })

//       if (addressArray.length > 0) {
//         setCurrentAccount(addressArray[0])
//       } else {
//         router.push('/')
//         setAppStatus('notConnected')
//       }
//     } catch (err) {
//       setAppStatus('error')
//     }
//   }

// }


