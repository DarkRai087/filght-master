import Link from "next/link"
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function Footer() {
    return (
        <footer className="bg-gray-900 w-full">
            <div
                className="container flex flex-col flex-wrap px-4 py-16 mx-auto md:items-center lg:items-start md:flex-row md:flex-nowrap"
            >
                <div className="flex-shrink-0 w-64 mx-auto text-center md:mx-0 md:text-left">
                    <Link href={"/"} className="text-2xl text-white">
                        My Website
                    </Link>
                    <p className="mt-2 text-xs text-justify text-gray-400">
                        Footer is a valuable resource that complements the main content of
                        the website by providing quick links, legal information, and ways to
                        connect, creating a well-rounded and user-friendly experience for
                        visitors.
                    </p>
                    <div className="flex mt-4 gap-3">
                        <Input type="email" placeholder="Email" height={"20px"} />
                        <Button variant="destructive" size={"sm"}>Subscribe</Button>
                    </div>
                    <div className="flex justify-center mt-4 space-x-4 lg:mt-2">
                        <Link href={""}>
                            <Facebook className="text-blue-500" />
                        </Link>
                        <Link href={""}>
                            <Twitter className="text-sky-300" />
                        </Link>
                        <Link href={""}>
                            <Instagram className="text-pink-500" />
                        </Link>
                        <Link href={""}>
                            <Linkedin className="text-blue-400" />
                        </Link>
                    </div>
                </div>
                <div className="justify-between w-full mt-4 text-center lg:flex">
                    <div className="w-full px-4 lg:w-1/3 md:w-1/2">
                        <h2 className="mb-2 font-bold tracking-widest text-gray-100">
                            Quick Links
                        </h2>
                        <ul className="mb-8 space-y-2 text-sm list-none">
                            <li>
                                <Link href={"/"} className="text-gray-300">
                                    Link 1
                                </Link>
                            </li>
                            <li>
                                <Link href={"/"} className="text-gray-300">
                                    Link 2
                                </Link>
                            </li>
                            <li>
                                <Link href={"/"} className="text-gray-300">
                                    Link 3
                                </Link>
                            </li>
                            <li>
                                <Link href={"/"} className="text-gray-300">
                                    Link 4
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="w-full px-4 lg:w-1/3 md:w-1/2">
                        <h2 className="mb-2 font-bold tracking-widest text-gray-100">
                            Quick Links
                        </h2>
                        <ul className="mb-8 space-y-2 text-sm list-none">
                            <li>
                                <Link href={"/"} className="text-gray-300">
                                    Link 1
                                </Link>
                            </li>
                            <li>
                                <Link href={"/"} className="text-gray-300">
                                    Link 2
                                </Link>
                            </li>
                            <li>
                                <Link href={"/"} className="text-gray-300">
                                    Link 3
                                </Link>
                            </li>
                            <li>
                                <Link href={"/"} className="text-gray-300">
                                    Link 4
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="w-full px-4 lg:w-1/3 md:w-1/2">
                        <h2 className="mb-2 font-bold tracking-widest text-gray-100">
                            Quick Links
                        </h2>
                        <ul className="mb-8 space-y-2 text-sm list-none">
                            <li>
                                <Link href={"/"} className="text-gray-300">
                                    Link 1
                                </Link>
                            </li>
                            <li>
                                <Link href={"/"} className="text-gray-300">
                                    Link 2
                                </Link>
                            </li>
                            <li>
                                <Link href={"/"} className="text-gray-300">
                                    Link 3
                                </Link>
                            </li>
                            <li>
                                <Link href={"/"} className="text-gray-300">
                                    Link 4
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="flex justify-center -mt-12">
                <p className="text-center text-white pb-2">
                    @2024 All rights reserved by your website.
                </p>
            </div>
        </footer>
    )
}