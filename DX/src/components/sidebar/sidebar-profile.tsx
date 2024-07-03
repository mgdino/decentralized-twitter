import { AnimatePresence, motion } from 'framer-motion';
import { Menu } from '@headlessui/react';
import cn from 'clsx';
import { useAuth } from '@lib/context/auth-context';
import { useModal } from '@lib/hooks/useModal';
import { Modal } from '@components/modal/modal';
import { ActionModal } from '@components/modal/action-modal';
import { Button } from '@components/ui/button';
import { HeroIcon } from '@components/ui/hero-icon';
import { CustomIcon } from '@components/ui/custom-icon';
import { UserAvatar } from '@components/user/user-avatar';
import { UserName } from '@components/user/user-name';
import { UserUsername } from '@components/user/user-username';
import { variants } from './more-settings';
import type { User } from '@lib/types/user';
import React, {useState}  from 'react'

import {ethers} from 'ethers'
import abi from '../../abi.json'
import { useEffect } from 'react';

export function SidebarProfile(){

  let contractAddress = '0xc7fe1205bdb9d5d573f3af1003398eb37fd44271';
  const [txs, setTxs] = useState([]);
  const [contractListened, setContractListened] = useState();
  const [error, setError] = useState();
  const [currentVal, setCurrentVal] = useState(0);
  const [contractInfo, setContractInfo] = useState({
    address: "-",
    tokenName: "-",
    tokenSymbol: "-",
    totalSupply: "-"
  });
  const [balanceInfo, setBalanceInfo] = useState({
    address: "-",
    balance: "-"
  });

  useEffect(() => {
    if (contractInfo.address !== "-") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const erc20 = new ethers.Contract(
        contractAddress,
        abi,
        provider
      );

    }
    handleSubmit(null)
  }, [contractInfo.address]);

  const handleSubmit = async (e) => {
    // e.preventDefault();
    // const data = new FormData(e.target);
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const erc20 = new ethers.Contract(contractAddress, abi, provider);

    const tokenName = await erc20.owner();
    const bal = await erc20.balanceOf("0x7E25F495628b5A510e6952b48a6F57ec1419E5B7");
    // const tokenSymbol = await erc20.symbol();
    // const totalSupply = await erc20.totalSupply();

    console.log(tokenName)
    console.log(Number(BigInt(bal)))
    setCurrentVal(Number(BigInt(bal)))
  };

  const { user, signOut } = useAuth();
  const { open, openModal, closeModal } = useModal();

  const { name, username, verified, photoURL } = user as User;



  return (
    <>
      <Modal
        modalClassName='max-w-xs bg-main-background w-full p-8 rounded-2xl'
        open={open}
        closeModal={closeModal}
      >
        <ActionModal
          useIcon
          focusOnMainBtn
          title='Log out of Twitter?'
          description='You can always log back in at any time. If you just want to switch accounts, you can do that by adding an existing account.'
          mainBtnLabel='Log out'
          action={signOut}
          closeModal={closeModal}
        />
      </Modal>
      
      <Menu className='relative' as='section'>
        {({ open }): JSX.Element => (
          <>
            <Menu.Button
              className={cn(
                `custom-button main-tab dark-bg-tab flex w-full items-center 
                 justify-between hover:bg-light-primary/10 active:bg-light-primary/20
                 dark:hover:bg-dark-primary/10 dark:active:bg-dark-primary/20`,
                open && 'bg-light-primary/10 dark:bg-dark-primary/10'
              )}
            >
              <div className='flex gap-3 truncate'>
                <UserAvatar src={photoURL} alt={name} size={40} />
                <div className='hidden truncate text-start leading-5 xl:block'>
                  <UserName name={name} className='start' verified={verified} />
                  <UserUsername username={username} disableLink />
                </div>
              </div>
              <HeroIcon
                className='hidden h-6 w-6 xl:block'
                iconName='EllipsisHorizontalIcon'
              />
            </Menu.Button>
            <AnimatePresence>
              {open && (
                <Menu.Items
                  className='menu-container absolute left-0 right-0 -top-36 w-60 xl:w-full'
                  as={motion.div}
                  {...variants}
                  static
                >
                  <Menu.Item
                    className='flex items-center justify-between gap-4 border-b 
                               border-light-border px-4 py-3 dark:border-dark-border'
                    as='div'
                    disabled
                  >
                    <div className='flex items-center gap-3 truncate'>
                      <UserAvatar src={photoURL} alt={name} />
                      <div className='truncate'>
                        <UserName name={name} verified={verified} />
                        <UserUsername username={username} disableLink />
                      </div>
                    </div>
                    <i>
                      <HeroIcon
                        className='h-5 w-5 text-main-accent'
                        iconName='CheckIcon'
                      />
                    </i>
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }): JSX.Element => (
                      <Button
                        className={cn(
                          'flex w-full gap-3 rounded-md rounded-t-none p-4',
                          active && 'bg-main-sidebar-background'
                        )}
                        onClick={openModal}
                      >
                        <HeroIcon iconName='ArrowRightOnRectangleIcon' />
                        Log out @{username}
                      </Button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                          <div className='flex items-center justify-center pb-5' >DX Tokens: {currentVal} </div>
                  </Menu.Item>
                  
                  <i
                    className='absolute -bottom-[10px] left-2 translate-x-1/2 rotate-180
                               [filter:drop-shadow(#cfd9de_1px_-1px_1px)] 
                               dark:[filter:drop-shadow(#333639_1px_-1px_1px)]
                               xl:left-1/2 xl:-translate-x-1/2'
                  >
                    <CustomIcon
                      className='h-4 w-6 fill-main-background'
                      iconName='TriangleIcon'
                    />
                  </i>
                </Menu.Items>
              )}
            </AnimatePresence>
          </>
        )}
      </Menu>
    </>
  );
}
