import Link from 'next/link'
import Image from 'next/image'
import logo from '../public/disney.png'

const NavBar = ({account}) => {
    return (
        <div className='navbar'>
            <Link href='/'><Image src={logo} alt='Disney logo' width={150} height={50}></Image></Link>
            <div className='account-info'>
                <p>Tervetuloa {account.username}</p>
                <img className='avatar' src={account.avatar.url} />
            </div>
        </div>
    )
}

export default NavBar