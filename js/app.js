document.addEventListener('DOMContentLoaded', function () {
    //Seleccionar elementos de la interfas
    const inputEmail = document.querySelector('#email');
    const inputAsunto = document.querySelector('#asunto');
    const inputMensaje = document.querySelector('#mensaje');
    const formulario = document.querySelector('#formulario');
    const btnSubmit = document.querySelector(
        '#formulario button[type="submit"]'
    );
    const btnReset = document.querySelector('#formulario button[type="reset"]');

    const spinner = document.querySelector('#spinner');

    const inputcc = document.querySelector('#cc');

    // console.log(inputEmail, inputAsunto,inputMensaje);

    const email = {
        email: '',
        asunto: '',
        mensaje: '',
    };

    // console.log(email);

    inputEmail.addEventListener('input', validar);
    inputAsunto.addEventListener('input', validar);
    inputMensaje.addEventListener('input', validar);
    formulario.addEventListener('submit', enviarEmail);
    inputcc.addEventListener('input', validarCC);

    btnReset.addEventListener('click', function (e) {
        e.preventDefault();

        //reiniciar el objeto
        reiniciarFormulario();
    });

    function reiniciarFormulario() {
        email.email = '';
        email.asunto = '';
        email.mensaje = '';
        formulario.reset();
        comprobarEmail();
    }

    function enviarEmail(e) {
        e.preventDefault();
        spinner.classList.add('flex');
        spinner.classList.remove('hidden');

        setTimeout(() => {
            spinner.classList.remove('flex');
            spinner.classList.add('hidden');
            reiniciarFormulario();

            //Crear una alerta
            const alertaExito = document.createElement('p');
            alertaExito.classList.add(
                'bg-green-500',
                'text-white',
                'p-2',
                'text-center',
                'rounded-lg',
                'mt-10',
                'font-bold',
                'text-sm',
                'uppercase'
            );
            alertaExito.textContent = 'Se envió correctamente el email';
            formulario.appendChild(alertaExito);

            setTimeout(() => alertaExito.remove(), 2000);
        }, 3000);
    }

    function validarCC(e) {
        if (!validarEmail(e.target.value)) {
            mostrarAlerta(
                `El email "${e.target.value}" no es valido`,
                e.target.parentElement
            );
            comprobarEmail();
            return;
        }

        if (e.target.value) {
            email.cc = e.target.value;
        }

        LimpiarAlerta(e.target.parentElement);
        comprobarEmail();
    }

    function validar(e) {
        if (e.target.value.trim() === '') {
            mostrarAlerta(
                `El campo ${e.target.id} es obligatorio`,
                e.target.parentElement
            );
            email[e.target.id] = '';
            comprobarEmail();
            return;
        }

        if (!validarEmail(e.target.value) && e.target.id === 'email') {
            mostrarAlerta(
                `El email "${e.target.value}" no es valido`,
                e.target.parentElement
            );
            email[e.target.id] = '';

            comprobarEmail();
            return;
        }

        LimpiarAlerta(e.target.parentElement);

        //Asignar valores

        email[e.target.id] = e.target.value.trim().toLowerCase();

        //Comprobar email

        comprobarEmail();
    }

    function mostrarAlerta(mensaje, referencia) {
        LimpiarAlerta(referencia);
        const error = document.createElement('P');
        error.textContent = mensaje;
        error.classList.add('bg-red-600', 'text-white', 'p-2', 'text-center');
        //Inyectar el error al formulario
        referencia.appendChild(error);
    }

    function LimpiarAlerta(referencia) {
        const alerta = referencia.querySelector('.bg-red-600');

        if (alerta) {
            alerta.remove();
        }
    }

    function validarEmail(email) {
        const regex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
        const resultado = regex.test(email);
        return resultado;
    }

    function comprobarEmail() {
        if (Object.values(email).includes('')) {
            btnSubmit.classList.add('opacity-50');
            btnSubmit.disabled = true;
            return;
        }

        btnSubmit.classList.remove('opacity-50');
        btnSubmit.disabled = false;
    }
});
