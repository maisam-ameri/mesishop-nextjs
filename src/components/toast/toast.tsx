import { ToastModel } from "./toastModel"

interface toastProps{
  toastModel: ToastModel,
}

function Toast( toastModel : toastProps) {
  return (
    <div className="toast">
      {`${toastModel.toastModel.message}_${toastModel.toastModel.id}` }
    </div>
  )
}

export default Toast