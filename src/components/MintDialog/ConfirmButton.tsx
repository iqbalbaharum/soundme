import { usePrepareContractWrite, useContractWrite, useWaitForTransaction } from 'wagmi'
import { ethers, BigNumber } from 'ethers'
import { LoadingSpinner } from 'components/Icons/icons'
import { useContext, useState } from 'react'
import { AlertMessageContext } from 'hooks/use-alert-message'

interface ConfirmButton {
  tokenId: String
  onBookmarkSuccess: any
}

const ConfirmButton = ({ tokenId, onBookmarkSuccess }: ConfirmButton) => {
  const { showError } = useContext(AlertMessageContext)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  // logic same as MintButton/index.tsx component
  const { config } = usePrepareContractWrite({
    address: process.env.NEXT_PUBLIC_COLLABEAT as any,
    abi: [
      {
        inputs: [
          { internalType: 'uint256', name: 'tokenId', type: 'uint256' },
          { internalType: 'uint32', name: 'amount', type: 'uint32' },
        ],
        name: 'mint',
        outputs: [],
        stateMutability: 'payable',
        type: 'function',
      },
    ],
    functionName: 'mint',
    args: [BigNumber.from(tokenId), 1],
    overrides: {
      value: ethers.utils.parseUnits('0.015', 'ether'),
    },
    onError(error) {
      console.log('Error', error)
    },
  })

  const { data, writeAsync } = useContractWrite(config)

  const { isSuccess } = useWaitForTransaction({
    hash: data?.hash,
    onSuccess: () => {
      onBookmarkSuccess()
      setIsLoading(false)
    },
  })

  const onHandleConfirmClicked = async () => {
    setIsLoading(true)

    try {
      await writeAsync?.()
    } catch (e: unknown) {
      const error = e as Error
      showError(`${error.message}`)
      setIsLoading(false)
    }
  }

  return (
    <button className="mr-2 bg-green-500 px-5 py-3 " disabled={isLoading} onClick={() => onHandleConfirmClicked()}>
      {isLoading ? <LoadingSpinner /> : 'Confirm'}
    </button>
  )
}

export default ConfirmButton
