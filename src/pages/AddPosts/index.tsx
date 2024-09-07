import React, { useEffect, useState } from 'react'
import Container from '../../components/Container'
import { InputTextField } from '../../components/Inputs/InputTextField'
import { InputFileUpload } from '../../components/InputFileUpload'
import { create, findById, update } from '../../services/book'
import { useNavigate, useParams } from 'react-router-dom'
import { LoadingButton } from '@mui/lab'

export const AddPosts = () => {
  const [title, setTitle] = useState('');
  const [storyline, setStorylinet] = useState('');
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');
  const [errorsValidation, setErrorsValidation] = useState<any>({});
  const [loading, setLoading] = useState(false);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const { id } = useParams();

  const navigate = useNavigate();

  const handleFileChange = (file: File) => {
    setSelectedFile(file);
    // Você pode enviar o arquivo para o backend aqui ou fazer outras operações necessárias
    // uploadFile(file);
  };

  const handleFindPost = async (id: string) => {
    
    try {
      const response = await findById(id);
      setTitle(response.title);
      setStorylinet(response.storyline);
      setUrl(response.url);
      console.log(response.url);
      console.log(response);
    } catch (error) {
      setError('');
      setErrorsValidation({});
      throw error;
    }
  }

  const handleSave = async () => {
    setLoading(true);

    try {
      if(id){
        const response = await update(id, { title, storyline, url});
        console.log(response);
        navigate("/");
      }else{
        const response = await create({ title, storyline, url});
        console.log(response);
        navigate("/");
      }
    } catch (error) {
      throw error;
    }

    setTitle("");
    setStorylinet("");
    setUrl("");
    setLoading(false);
  }

  // const uploadFile = async (file: File) => {
  //   const formData = new FormData();
  //   formData.append('file', file);

  //   const response = await fetch('https://your-backend-url/api/upload', {
  //     method: 'POST',
  //     body: formData,
  //   });

  //   if (response.ok) {
  //     console.log('File uploaded successfully');
  //   } else {
  //     console.log('File upload failed');
  //   }
  // };

  useEffect(() => {
    if (id) {
      handleFindPost(id);
    }
  }, [id]);

  return (
    <Container>
      <div style={{ maxWidth: '60%', minWidth: '30%', margin: '10vh auto', display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
        <InputTextField
          value={title}
          onChange={setTitle}
          label='Digite seu o titulo'
          error={errorsValidation.title}/>
        <InputTextField
          value={storyline}
          onChange={setStorylinet}
          label='Descricão'
          error={errorsValidation.storyline}/>
        <InputTextField
          value={url}
          onChange={setUrl}
          label='Imagem (URL)'
          error={errorsValidation.url}/>
        <div>
          <InputFileUpload
            onFileChange={handleFileChange}
            disabled={true}/>
          {selectedFile && <p>File selected: {selectedFile.name}</p>}
        </div>
        {error && <span style={{color: 'red'}}>{error}</span>}
        
        <LoadingButton
          onClick={handleSave}
          loading={loading}
          disabled={loading}
          variant='outlined'
          color='primary'
          style={{backgroundColor: '#fff', width: '50%', marginTop: '2vh'}}
        >
          {id ? 'ATUALIZAR POST' : 'CADASTRAR POST'}
        </LoadingButton>

      </div>
    </Container>
  )
}
