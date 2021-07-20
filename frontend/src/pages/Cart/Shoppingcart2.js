import React, { useState, useEffect } from 'react'
import { Modal, Button } from 'react-bootstrap'
import './Shoppingcart1.css'
import { withRouter } from 'react-router-dom'
import itemphoto from './img/item1.png'
import './Shoppingcart2.css'
import grayline from './img/grayline.svg'
import launch from './img/launch.svg'
import launch2 from './img/launch2.svg'
function Shoppingcart2(props) {
  console.log(props)
  const [ItemOne, setItemOne] = useState(1)
  const [ItemTwo, setItemTwo] = useState(1)
  const [ItemThree, setItemThree] = useState(1)
  const {} = props
  const currentCart = JSON.parse(localStorage.getItem('cart')) || ''
  // 代表每個產品的單價
  const [mycart, setMycart] = useState([])
  const [dataLoading, setDataLoading] = useState(false)
  const [mycartDisplay, setMycartDisplay] = useState([])
  const { updateCartNum } = props
  function getCartFromLocalStorage() {
    // 開啟載入的指示圖示
    setDataLoading(true)

    const newCart = localStorage.getItem('cart') || '[]'

    console.log(JSON.parse(newCart))

    setMycart(JSON.parse(newCart))
  }

  useEffect(() => {
    getCartFromLocalStorage()
  }, [])

  // 每次mycart資料有改變，1秒後關閉載入指示
  // componentDidUpdate
  useEffect(() => {
    setTimeout(() => setDataLoading(false), 1000)

    // mycartDisplay運算
    let newMycartDisplay = []

    //尋找mycartDisplay
    for (let i = 0; i < mycart.length; i++) {
      //尋找mycartDisplay中有沒有此mycart[i].id
      //有找到會返回陣列成員的索引值
      //沒找到會返回-1
      const index = newMycartDisplay.findIndex(
        (value) => value.itemId === mycart[i].itemId
      )
      //有的話就數量+1
      if (index !== -1) {
        //每次只有加1個數量
        //newMycartDisplay[index].amount++
        //假設是加數量的
        newMycartDisplay[index].amount += mycart[i].amount
      } else {
        //沒有的話就把項目加入，數量為1
        const newItem = { ...mycart[i] }
        newMycartDisplay = [...newMycartDisplay, newItem]
      }
    }

    console.log(newMycartDisplay)
    setMycartDisplay(newMycartDisplay)
  }, [mycart])

  // 更新購物車中的商品數量
  const updateCartToLocalStorage = (item, isAdded = true) => {
    console.log(item, isAdded)
    const currentCart = JSON.parse(localStorage.getItem('cart')) || []

    // find if the product in the localstorage with its id
    const index = currentCart.findIndex((v) => v.itemId === item.itemId)

    console.log('index', index)
    // found: index! == -1
    if (index > -1) {
      isAdded ? currentCart[index].amount++ : currentCart[index].amount--
    }

    localStorage.setItem('cart', JSON.stringify(currentCart))

    
    // 設定資料
    setMycart(currentCart)
  }

  // 計算總價用的函式
  const sum = (items) => {
    let total = 0
    for (let i = 0; i < items.length; i++) {
      total += items[i].amount * items[i].price
    }
    return total
  }
  // 刪除單一項目
  const updateCartRemove = (index) => {
    const currentCart = JSON.parse(localStorage.getItem('cart')) || []
    console.log(currentCart[index])

    const a = currentCart.filter((v, i) => {
      console.log(v)
      if (index !== i) {
        return v
      }
    })
    console.log(a)

    localStorage.setItem('cart', JSON.stringify(a))

    // 設定資料
    setMycart(a)
    // 更新購物車數量
    let total = 0
    for (let i = 0; i < a.length; i++) {
      total += a[i].amount
    }
    // updateCartNum()
  }

  // 計算總價
  const loading = (
    <>
      <div className="d-flex justify-content-center">
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    </>
  )

  // 計算所有商品數量

  return (
    <>
    <div className="container">
        <div className="top m-5">
          <img src={launch} alt width={100} height={100} />

          <img src={grayline} alt width={200} height={100} />
          <img src={launch2} alt width={100} height={100} />
          <img src={grayline} alt width={200} height={100} />
          <img src={launch2} alt width={100} height={100} />
        </div>
        <div className="top1 mb-4 ">
          <p2>購物明細</p2>
          <p3>付款資料</p3>
          <p3>訂單資訊</p3>
        </div>
      </div>
      <div className="cart1title1 p-3 mt-5">
        <p>購物明細</p>
      </div>
    
      <table className="cart1title2">
        <tbody>
          <tr>
            <th width="100px "></th>
            <th width="150px"><p>商品名稱</p></th>
            <th width="250px"><p>商品單價</p></th>
            <th width="200px"><p>商品數量</p></th>
            <th width="200px"><p>金額小計</p></th>
            <th width="100px" />
          </tr>
          {mycart.map((item, index) => {
            return (
              <tr key={item.itemId}>
           
                <td
                  id={item.itemId}
                  onClick={() => {
                    const cartList = [...mycart]
                    cartList.splice(index, 1)
                    setMycart(cartList)
                    localStorage.setItem('cart', JSON.stringify(cartList))
                  }}
                ></td>

                {/* <td height="150px">
                  {' '}
                  <img
                    className="itemphoto"
                    src={itemphoto}
                    alt=""
                    width={100}
                    height={100}
                  />
                </td>  */}
                <td height="130px">{item.name}</td>
                <td>{item.price}</td>
                <td>
                
                  <div className="counter2  ">
                    <li  class="ccc" id="minus">
                      <a
                        href="#/"
                        onClick={() => {
                          // 限制數量為最少要買1件
                          if (item.amount === 1) return
                          updateCartToLocalStorage(item, false)
                        }}
                      >

                        <input
                          type="button"
                          onclick="minuser()"
                          defaultValue="-"
                        />
                      </a>
                    </li>

                    <li  id="countnum2"> {item.amount}</li>

                    <li id="plus">
                      <a
                        href="#/"
                        onClick={() => {
                          updateCartToLocalStorage(item, true)
                        }}
                      >
                        <input
                          type="button"
                          onclick="adder()"
                          defaultValue="+"
                        />
                      </a>
                    </li>
                  </div>
                </td>
                <td> NT${item.amount * item.price}</td>
                <td>
                  <i
                    className=" far fa-trash-alt"
                    onClick={() => {
                      updateCartRemove(index)
                    }}
                  />
                </td>
              </tr>
            )
          })}
        
        </tbody>
      </table>
      <div className="end  p-5 mb-5">
        <p>訂單總金額: NT${sum(mycartDisplay)}</p>
      </div>

      <div className="button1 pb-4">
        <button
          onClick={() => {
            props.history.push('/Shoppingcart3')
          }}
        >
          前往結帳
        </button>
      </div>
    </>
  )
}

export default withRouter(Shoppingcart2)
