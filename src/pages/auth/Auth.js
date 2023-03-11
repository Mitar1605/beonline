import React, { memo, useState, useContext, useEffect } from 'react'
import {Link} from 'react-router-dom'
import useFetch from '../../hooks/useFetch'
import { isAuthContext } from '../../App'
import Axios from 'axios'
import './Auth.css'

export default memo(function Auth() {
  
  const {isAuth} = useContext(isAuthContext)

  const [isRegister, setIsRegister] = useState(!isAuth)

  const [remeberMe, setRememberMe] = useState(false);

  const {data} = useFetch('http://localhost:3500/users')

  const users = [].concat(data)

  const [post, setPost] = useState(
    {
      id: users.length,
      email: '',
      password: '',
      remeber: remeberMe
    }
  )

  const newPut = {
    id: 'aaaa',
    email: 'uuuu',
    password: 'asasdsa',
    remeberMe: 'asdsadsa'
  }

  const handle = (event) => {
    const newData = {...post}
    newData[event.target.name] = event.target.value
    setPost(newData)
  }

  useEffect(() => {
    const newData = {...post}
    newData.remeber = remeberMe
    setPost(newData)
  }, [remeberMe])

  return (
    <div className='auth_main'>
      <form onSubmit={(e) => {
        e.preventDefault()
        if (isRegister && !users.some(user => user.email === post.email) && post.password.length >= 8) {
          Axios.post('http://localhost:3500/users', post)
          window.location = 'http://localhost:3000/'

          remeberMe && localStorage.setItem('isAuth', JSON.stringify({val: true}))

          remeberMe && localStorage.setItem('rememberUser', JSON.stringify(post))
          
        }else if (isRegister && users.some(user => user.email === post.email)) {
          alert('Այս էլ․ հասցեն արդեն գրանցված է')
        }else if (post.password.length <= 8) {
          alert('Գաղտնաբառը պետք է պարունակի ամենաքիչը 8 նիշ')
        }else if (!isRegister) {
          if (users.some(user => user.email === post.email)) {
            const user = users.find(user => user.email === post.email)
            if (user.password === post.password) {
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
            <input type="email" name='email' placeholder='Մուտքագրեք ձեր էլ․ հասցեն' required title='Էլ․ Հասցե' onChange={(e) => handle(e)} />
        </label>
        <label>
            Գաղտանաբառ
            <input type="password" name='password' placeholder='********' required title='Գաղտանաբառ' onChange={(e) => handle(e)} />
        </label>

        <div className="form_password_remember">
            <label className='form_password_remember_label' >
                <input type="checkbox" onChange={() => setRememberMe(remeberMe ? false: true)} /> Հիշել տվյալներս
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
