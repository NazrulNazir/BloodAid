'use client'
import { useSession } from '@/lib/auth-client'
// import { modifyBooking } from '@/lib/data'
import { Button, Input, Label, Modal, Surface, TextField } from '@heroui/react'
import { redirect } from 'next/navigation'
import React from 'react'
import toast from 'react-hot-toast'
import { GrEdit } from 'react-icons/gr'
import { useRouter } from "next/navigation";



const EditProfile = () => {
    const router = useRouter();
    const {data} = useSession();
    const user = data?.user;
    const onSubmit = async(e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const newData = Object.fromEntries(formData.entries());
        

        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/user/${user?.id}`, {
            method: 'PATCH',
            headers: {
                'content-type' : 'application/json'
            },
            body: JSON.stringify(newData)
        });
        const data = await res.json();
        if(data.modifiedCount > 0){
            toast.success("Edit Successfully");
            // redirect(`/dashboard/profile`)
            router.push("/dashboard/profile");
            router.refresh();
        }else{
            alert('something wrong..');
        }
        

    }
    return (
        <div>
            <Modal>
                <Button variant="secondary"><GrEdit /> <span className="text-[16px]">Edit Profile</span></Button>
                <Modal.Backdrop>
                    <Modal.Container placement="auto">
                        <Modal.Dialog className="sm:max-w-md">
                            <Modal.CloseTrigger />
                            <Modal.Header>
                            </Modal.Header>
                            <Modal.Body className="">
                                <Surface variant="default">
                                    <form action="" onSubmit={onSubmit}>
                                        {/* <h1 className='text-3xl font-bold text-center text-green-600 mb-5'>update</h1> */}
                                        {/* <SigninGoogle></SigninGoogle> */}
                                        <fieldset className="fieldset flex flex-col gap-3 px-3">
                                            <input  defaultValue={user?.name} type="text" name='name' className="input border border-gray-200" placeholder="Facility Name" required />

                                            <input defaultValue={user?.bloodGroup} className='input border border-gray-200' type="text" name='bloodGroup' placeholder='bloodGroup' required />

                                            <div className='flex gap-3'>
                                                <input defaultValue={user?.district} className='input border border-gray-200' type="text" name='district' placeholder='Enter district' required />

                                                <input defaultValue={user?.upazila} className='input border border-gray-200' type="text" name='upazila' placeholder='upazila' required />
                                            </div>

                                            {/* <div className='flex gap-3'>
                                                <input defaultValue={user?.bloodGroup} className='input border border-gray-200' type="text" name='bloodGroup' placeholder='bloodGroup' required />
                                            </div> */}

                                            {/* <textarea defaultValue={booking.Description} className="w-80 h-25 resize-none border rounded-lg p-3 border-gray-200" name="Description" rows={6} placeholder='Description..' required></textarea> */}
                                        </fieldset>
                                        <Modal.Footer className='mt-5'>
                                            <Button slot="close" variant="secondary">
                                                Cancel
                                            </Button>
                                            <Button type='submit' slot="close">Update</Button>
                                        </Modal.Footer>
                                    </form>
                                </Surface>
                            </Modal.Body>
                        </Modal.Dialog>
                    </Modal.Container>
                </Modal.Backdrop>
            </Modal>
        </div>
    )
}

export default EditProfile
