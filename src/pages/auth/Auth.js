import React, { memo, useState, useContext } from 'react'
import {Link} from 'react-router-dom'
import useFetch from '../../hooks/useFetch'
import { isAuthContext } from '../../App'
import Axios from 'axios'
import './Auth.css'

export default memo(function Auth() {
  
  const {isAuth} = useContext(isAuthContext)

  const [isRegister, setIsRegister] = useState(!isAuth)

  const [emailText, setEmailText] = useState('')
  const [pswrdText, setPswrdText] = useState('')
  const [remeberMe, setRememberMe] = useState(false);

  const [pswrdLength, setPswrdLength] = useState(0)
 
  const changeText = (e, state) => {
    state(e.target.value)
    state === setPswrdText && setPswrdLength(e.target.value.length)
  }

  const {data} = useFetch('http://localhost:3500/users')

  const users = [].concat(data)

  return (
    <div className='auth_main'>
      <form onSubmit={(e) => {
        e.preventDefault()
        if (isRegister && !users.some(user => user.email === emailText) && pswrdLength >= 8) {
          Axios.post('http://localhost:3500/users', [
            ...users,
            {
              id: users.length,
              email: emailText,
              password: pswrdText,
              remeber: remeberMe
            }
          ])

          window.location = 'http://localhost:3000/'

          remeberMe && localStorage.setItem('isAuth', JSON.stringify({val: true}))

          remeberMe && localStorage.setItem('rememberUser', JSON.stringify({
            id: users.length,
            email: emailText,
            password: pswrdText,
            remeber: remeberMe
          }))
          
        }else if (isRegister && users.some(user => user.email === emailText)) {
          alert('Այս էլ․ հասցեն արդեն գրանցված է')
        }else if (pswrdLength <= 8) {
          alert('Գաղտնաբառը պետք է պարունակի ամենաքիչը 8 նիշ')
        }else if (!isRegister) {
          if (users.some(user => user.email === emailText)) {
            const user = users.find(user => user.email === emailText)
            if (user.password === pswrdText) {
              localStorage.setItem('isAuth', JSON.stringify({val: true}))
              localStorage.setItem('rememberUser', JSON.stringify(user))

              window.location = 'http://localhost:3000/'
            }else{
              alert('Գաղտնաբառը սխալ է')
            }
          }else{
            alert('Էլ․ հասցեն չի գտնվել')
          }
        }
        
      }}>
        <div className="form_title">
            <h1>{isRegister ? "Գրանցում": "Մուտք"}</h1>
            <span onClick={() => setIsRegister(!isRegister)}>{!isRegister ? "Գրանցում": "Մուտք"}</span>
        </div>
        <label>
            Էլ․ Հասցե
            <input type="email" placeholder='Մուտքագրեք ձեր էլ․ հասցեն' required title='Էլ․ Հասցե' onChange={(e) => changeText(e, setEmailText)} />
        </label>
        <label>
            Գաղտանաբառ
            <input type="password" placeholder='********' required title='Գաղտանաբառ' onChange={(e) => changeText(e, setPswrdText)} />
        </label>

        <div className="form_password_remember">
            <label className='form_password_remember_label' >
                <input type="checkbox" disabled onChange={() => setRememberMe(remeberMe ? false: true)} /> Հիշել տվյալներս
            </label>
            <Link to='/'>Մոռացել եմ գաղտնաբառս</Link>
        </div>
        <div className="login_form_submit">
            <button type='submit'>Մուտք</button>
        </div>
      </form>
    </div>
  )
})
