import React, {useMemo} from "react";

export const Intro = () => {
    const email = useMemo(() => {
        let subDomain = window.location.hostname.split(".");
        subDomain.shift();
        return "self@" + subDomain.join(".");
    }, [])
    return (
        <>
            <p>This is my archlinux repository, which contains many packages not provided by official
                repositories and ArchlinuxCN.</p>
            <p>You may contact me at <a href={`mailto:${email}`}>{email}</a> if you want to request a new
                package to be added to this repository, submit a takedown request, or report a bug.</p>
            <p>To use this repository, please add the following lines to <code>/etc/pacman.conf</code>.</p>
            <pre>
                [lightquantum]<br/>
                SigLevel = Never<br/>
                Server = https://repo.lightquantum.me
            </pre>
        </>
    )
}