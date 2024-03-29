// @ts-nocheck
import { useEffect, useState } from 'react'
import { useContractRead } from 'wagmi'
import { BigNumber } from 'ethers'
const GetTotalSupply = ({ tokenId  }: { tokenId :String }) => {
  const [supplyLeft, setSupplyLeft] = useState(0)

  const maxSupply = useContractRead({
    address: process.env.NEXT_PUBLIC_COLLABEAT_NFT as any,
    abi: [
      {
        inputs: [],
        name: 'maxSupplyPerTokenType',
        outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
        stateMutability: 'view',
        type: 'function',
      },
    ],
    functionName: 'maxSupplyPerTokenType',
  })

  const currentSupply = useContractRead({
    address: process.env.NEXT_PUBLIC_COLLABEAT_NFT as any,
    abi: [
      {
        inputs: [{ internalType: 'uint256', name: 'id', type: 'uint256' }],
        name: 'totalSupply',
        outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
        stateMutability: 'view',
        type: 'function',
      },
    ],
    functionName: 'totalSupply',
    args: [BigNumber.from(tokenId)],
  })

  useEffect(() => {
    if (maxSupply.data && currentSupply.data) {
      const total = maxSupply.data.toNumber() - currentSupply.data.toNumber()
      setSupplyLeft(total)
    }
  }, [maxSupply, currentSupply])
  return <>{supplyLeft}</>
}

export default GetTotalSupply
