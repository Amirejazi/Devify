import toast from "react-hot-toast";

export function successToast(text) {
    return toast.success(text, {
        style: {
            borderRadius: '15px',
            background: 'linear-gradient(145deg, #88d6f1, #72b4cb)',
            color: '#fff',
            fontWeight: '600',
            zoom: 1.2,
            boxShadow: '7px 7px 14px #68a4b9, -7px -7px 14px #96ecff;'
        },
        iconTheme: {
            primary: '#00E676',
            secondary: '#fff',
        },
    })
}

