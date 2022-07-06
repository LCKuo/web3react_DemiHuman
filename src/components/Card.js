import React from 'react';

function clicked() {
    console.log(window.innerWidth)
}
export default function Card() {
        return (
            <div>
                <div className="card">
                    <div className="container">
                        <img src="https://dictionary.cambridge.org/zht/images/thumb/black_noun_002_03536.jpg?version=5.0.245" className="card--image" />
                        <button className="btn" onClick={clicked}>CONNECT WALLET</button>
                        <h1 className="text">LOGIN TO VIEW YOUR COLLECTION</h1>
                    </div>
                    <div className="story--preview">
                        <img src="https://uploads-ssl.webflow.com/6165507cab3fc14387e2119a/62b5653e9ef02b6bf2ecf662_%E6%88%AA%E5%9C%96%202022-06-24%20%E4%B8%8B%E5%8D%883.17.37-p-1600.png" className="card--image2" />
                        <h1 className="card--story">The very first installment of the Demi-Human NFT Comic series!</h1>
                        <h1 className="card--story">This story takes place in 2069, the earth trembles, in the Demiverse.</h1>
                    <button className="btnStory">CLICK HERE FOR A PREVIEW</button>
                </div>
            </div>
        </div>



    )
}