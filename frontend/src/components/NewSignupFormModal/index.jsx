import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import SignUpForm from './SignUpForm.js';

function SignUpFormModal() {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <span className="sign-up" onClick={() => setShowModal(true)}>Sign Up</span>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <SignUpForm />
                </Modal>
            )}
        </>
    );
};


export default SignUpFormModal;