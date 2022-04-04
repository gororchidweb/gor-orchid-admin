import { Fragment, useState } from 'react';
import {
    Button,
    Confirm,
    Create,
    SimpleForm,
    TextInput,
    useNotify,
    useRefresh,
    useUnselectAll,
    useUpdateMany,
    useInput,
    required 
} from 'react-admin';
import {} from 'react-admin';
import MaterialButton from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';

const CustomBulkUpdateStatusButton = ({selectedIds}) => {
    const [open, setOpen] = useState(false);
    const refresh = useRefresh();
    const notify = useNotify();
    const unselectAll = useUnselectAll();
    const [status, setStatus] = useState('')
    

    const [updateMany, { loading }] = useUpdateMany(
        'tracking',
        selectedIds,
        { status },
        {
            onSuccess: () => {
                refresh();
                notify('Tracking data telah diupdate');
                unselectAll('tracking');
            },
            onFailure: error => notify('Error: Tracking data tidak terupdate', { type: 'warning' }),
        }
    );
    const handleClick = () => setOpen(true);
    const handleDialogClose = () => setOpen(false);

    const handleConfirm = () => {
        updateMany();
        setOpen(false);
    };
    console.log('status', status)

    return (
        <Fragment>
            <Button label="Bulk Update Status" onClick={handleClick} />
            <Dialog onClose={handleDialogClose} open={open}>
            <DialogTitle>Update Status</DialogTitle>
            <DialogContent>
            <TextField
            style={{padding: '10px'}}
            name={'status'}
            label={'Status'}
            onChange={e => setStatus(e.target.value)}
            required={true}
            />
            </DialogContent>
            <DialogActions>
            <MaterialButton onClick={handleConfirm}>Update Status</MaterialButton>
            </DialogActions>
            </Dialog>
            {/* <Confirm
                isOpen={open}
                loading={loading}
                title="Reset status menjadi 'Dalam Perjalanan'"
                content="Apakah kamu yakin ingin mereset status untuk tracking data ini menjadi 'Dalam Perjalanan'?"
                onConfirm={handleConfirm}
                onClose={handleDialogClose}
            /> */}
        </Fragment>
    );
}

export default CustomBulkUpdateStatusButton;