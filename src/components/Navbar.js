import React from 'react';

export default function Navbar() {
    return (
        <div className="nav--item">
            <img src="https://uploads-ssl.webflow.com/6165507cab3fc14387e2119a/616a54915ecc234010c74b45_Demiverse-p-500.png"
                className="nav--logo" />
            <button>
                <img src="https://uploads-ssl.webflow.com/6165507cab3fc14387e2119a/616570ae56de5b47543409fe_discord-p-500.png"
                    className='nav--button'
                />
            </button>
            <button>
                <img src="https://uploads-ssl.webflow.com/6165507cab3fc14387e2119a/61c28a46338ace2d0e11d24c_%E6%88%AA%E5%9C%96_2021-12-22_%E4%B8%8A%E5%8D%8810.13.29-removebg-preview%20(1).png"
                    className='nav--button'
                />
            </button>
        </div>
    )
}