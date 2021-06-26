import React,{useState,useEffect} from 'react';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import Axios from 'axios';

const filter = createFilterOptions();

export default function FreeSoloCreateOptionDialog() {
  const [value, setValue] = React.useState(null);
  const [open, toggleOpen] = React.useState(false);
  const [searchValue, setsearchValue]=useState('')

  const handleClose = () => {
    setDialogValue({
      title: '',
    });

    toggleOpen(false);
  };

  const [dialogValue, setDialogValue] = React.useState({
    title: '',
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    setValue({
      title: dialogValue.title,
    });

    handleClose();
  };
 useEffect(()=>{
  // Axios.get(`https://api.flickr.com/services/rest/?method=flickr.galleries.getPhotos&api_key=c8c78d376c5b81d57079b51ac633fcb8&gallery_id=66911286-72157647277042064&format=json&nojsoncallback=1`)
  // .then((response)=>{
  //   console.log(response)
  // })
  // .catch((err)=>{
  //   console.log(err)
  // })
   Axios.get(`https://live.staticflickr.com/8187/8432423659_dd1b834ec5_w.jpg`)
  .then((response)=>{
    console.log(response)
  })
  .catch((err)=>{
    console.log(err)
  })
 },[value])


  return (
    <React.Fragment>
      <Autocomplete
        value={value}
        onChange={(event, newValue) => {
          if (typeof newValue === 'string') {
            setTimeout(() => {
              toggleOpen(true);
              setDialogValue({
                title: newValue,
              });
            });
          } else if (newValue && newValue.inputValue) {
            toggleOpen(true);
            setDialogValue({
              title: newValue.inputValue,
            });
          } else {
            setValue(newValue);
          }
        }}
        filterOptions={(options, params) => {
          const filtered = filter(options, params);

          if (params.inputValue !== '') {
            setValue(params.inputValue)
            filtered.push({
              inputValue: params.inputValue,
              title: `${params.inputValue}`,
              
            });
          }
          
          return filtered;
        }}
        id="free-solo-dialog-demo"
        options={search_text}
        getOptionLabel={(option) => {
        
          if (typeof option === 'string') {
            return option;
          }
          if (option.inputValue) {
            return option.inputValue;
          }
          return option.title;
        }}
        selectOnFocus
        clearOnBlur
        handleHomeEndKeys
        renderOption={(option) => option.title}
        style={{ width: 500, backgroundColor: "white"}}
        freeSolo
        renderInput={(params) => (
          <TextField {...params} label="Search Photos" variant="outlined" />
        )}
      />
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <form onSubmit={handleSubmit}>
          <DialogTitle id="form-dialog-title">Add</DialogTitle>
          <DialogContent>
          
            <TextField
              autoFocus
              margin="dense"
              id="name"
              value={dialogValue.title}
              onChange={(event) => setDialogValue({ ...dialogValue, title: event.target.value })}
              label="title"
              type="text"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button type="submit" color="primary">
              Add
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </React.Fragment>
  );
}

const search_text = [
  { title: 'Nature' },
  { title: 'Rivers' },
  { title: 'Trees' },
  { title: 'street'},
  { title: 'City'},
  { title: 'Sun' },
  { title: 'Moon'},
];

