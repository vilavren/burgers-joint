import classNames from 'classnames'
import style from './ModalDelivery.module.css'

import { useDispatch, useSelector } from 'react-redux'
import { closeModal } from '../../redux/modalDelivery/modalDeliverySlice'
import { updateFormValue } from '../../redux/formSlice/formSlice'

export const ModalDelivery = () => {
  const { isOpen } = useSelector((state) => state.modalDelivery)
  const form = useSelector((state) => state.form)
  const dispatch = useDispatch()

  const handleInputchange = (event) => {
    dispatch(
      updateFormValue({
        field: event.target.name,
        value: event.target.value,
      })
    )
  }

  return (
    isOpen && (
      <div
        className={style.modal}
        onClick={({ target, currentTarget }) => {
          if (target === currentTarget) {
            dispatch(closeModal())
          }
        }}
      >
        <div className={style.mdelivery}>
          <div className={style.container}>
            <h2 className={style.title}>Доставка</h2>

            <form className={style.form} id="delivery">
              <fieldset className={style.fieldset}>
                <input
                  className={style.input}
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleInputchange}
                  placeholder="Ваше имя"
                />
                <input
                  className={style.input}
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleInputchange}
                  placeholder="Телефон"
                />
              </fieldset>

              <fieldset className={style.fieldset_radio}>
                <label className={style.label}>
                  <input
                    className={style.radio}
                    type="radio"
                    name="format"
                    value="pickup"
                    checked={form.format === 'pickup'}
                    onChange={handleInputchange}
                  />
                  <span>Самовывоз</span>
                </label>

                <label className={style.label}>
                  <input
                    className={style.radio}
                    type="radio"
                    name="format"
                    value="delivery"
                    checked={form.format === 'delivery'}
                    onChange={handleInputchange}
                  />
                  <span>Доставка</span>
                </label>
              </fieldset>

              <fieldset className={style.fieldset}>
                <input
                  className={style.input}
                  type="text"
                  name="address"
                  value={form.address}
                  onChange={handleInputchange}
                  placeholder="Улица, дом, квартира"
                />
                <input
                  className={classNames(style.input, style.input_half)}
                  type="number"
                  name="floor"
                  value={form.floor}
                  onChange={handleInputchange}
                  placeholder="Этаж"
                />
                <input
                  className={classNames(style.input, style.input_half)}
                  type="number"
                  name="intercom"
                  value={form.intercom}
                  onChange={handleInputchange}
                  placeholder="Домофон"
                />
              </fieldset>
            </form>

            <button className={style.submit} type="submit" form="delivery">
              Оформить
            </button>
          </div>

          <button
            className={style.modal__close}
            type="button"
            onClick={() => {
              dispatch(closeModal())
            }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="5.07422"
                y="5.28247"
                width="1"
                height="20"
                transform="rotate(-45 5.07422 5.28247)"
              />
              <rect
                x="5.78125"
                y="19.4246"
                width="1"
                height="20"
                transform="rotate(-135 5.78125 19.4246)"
              />
            </svg>
          </button>
        </div>
      </div>
    )
  )
}
