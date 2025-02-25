"use client"

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { redirect } from 'next/navigation'
import { useAuthContext } from '@contexts/AuthContext'

const Header = ({ ThemeToggle }) => {
    const auth = useAuthContext()
    const [homeLink, setHomeLink] = useState('/')
    const [doRedirect, setDoRedirect] = useState(false)

    useEffect(() => {
        if (auth?.user) {
            setHomeLink('/home')
        }
    }, [auth?.user])

    const logOut = async (event) => {
        auth.logout()
        setDoRedirect(true)
    }

    if (doRedirect) redirect('/')

    return (
        <header className="navbar">
            <Link href={homeLink} className="btn btn-ghost normal-case text-xl"><span className="text-accent">100</span>freelancers</Link>
            <div className="">
                {auth?.user ? (
                    <div className="dropdown dropdown-end text-secondary">
                        <label tabIndex="0" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <Image
                                    src={auth?.user.avatar}
                                    width={37}
                                    height={37}
                                    className="rounded-full border-4 border-accent"
                                    alt="Profile"
                                />
                            </div>
                        </label>
                        <ul tabIndex="0" className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-primary border border-secondary rounded-box w-52">
                            <li><Link href={homeLink}>Home</Link></li>
                            <li>
                                <Link href={'/profile'} className="justify-between">
                                    Profile
                                    <span className="badge">New</span>
                                </Link>
                            </li>
                            <li><Link href="/client/add">+ Client</Link></li>
                            <li><Link href="/outreach/add">+ Outreach</Link></li>
                            <li><Link href={'/settings'}>Settings</Link></li>
                            {auth.user.admin &&
                                <li><Link href={'/admin'}>Admin Tools</Link></li>
                            }
                            <li><span className="pointer" onClick={logOut}>Logout</span></li>
                            <li><div className="form-control flex flex-row gap-1 mr-2">
                                <ThemeToggle />
                            </div></li>
                        </ul>
                    </div>

                )
                    : (<>
                        <form action={'/server/auth/discord'}>
                            <button
                                type="submit"
                                className="btn btn-primary"
                            >
                                Sign In
                            </button></form>
                    </>)
                }

            </div>
        </header>
    )
}

export default Header