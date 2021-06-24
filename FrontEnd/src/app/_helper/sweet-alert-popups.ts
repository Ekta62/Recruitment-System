
import Swal from 'sweetalert2/dist/sweetalert2.js';

export class SweetAlertPopUps{

    static errorPopMessage(headerMesage ,message,iconType) {
        Swal.fire(headerMesage, message, iconType)
    }
}
