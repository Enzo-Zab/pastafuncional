
import './App.css'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
function App() {
  const [livros, setLivros] = useState([]);
const [novoLivro, setNovoLivro] = useState({
  título: '',
  autor: '',
  editora: '',
  gênero: '',
 
});

useEffect(() => {
  fetchLivros();
}, []);

//get
const fetchLivros = async () => {
  try {
    const response = await axios.get('http://localhost:8090/livros');
    setLivros(response.data);
  } catch (error) {
    console.error('Erro ao buscar livros:', error); 
  }
};

//Atualização dos inputs
const handleInputChange = (event) => {
  const { name, value } = event.target;
  setNovoLivro((prevLivro) => ({
    ...prevLivro,
    [name]: value
    
  }));


};
//Post 
const handleSubmit = async (event) => {
  event.preventDefault();
  try {
    await axios.post('http://localhost:8090/livros', novoLivro);
    fetchLivros();
    setNovoLivro({
      título: '',
      autor: '',
      editora: '',
      gênero: '',
    });
  } catch (error) {
    console.error('Erro ao criar livro:', error);
  }
};
//Delete
const handleDelete = async (id) => {
  try {
    await axios.delete(`http://localhost:8090/livros/${id}`);
    fetchLivros();
  } catch (error) {

    console.error('Erro ao excluir livroo:', error);
  }
};
//Put
const handleUpdate = async (id, livroAtualizado) => {
  try {
    await axios.put(`http://localhost:8090/livros/${id}`, livroAtualizado);
    fetchLivros();
  } catch (error) {
    console.error('Erro ao atualizar livro:', error);
  }
};
//Renderização
return (
  <div>
    {/* Cabeçalho */}
    <h1>Gerenciamento de Livros</h1>

    {/* Formulário de adição de veículo */}
    <form onSubmit={handleSubmit}>
      {/* Campo para o título */}
      <input
        type="text"
        name="título"
        placeholder="Título"
        value={novoLivro.título}
        onChange={handleInputChange}
      />
      {/* Campo para a montadora */}
      <input
        type="text"
        name="autor"
        placeholder="Escritor"
        value={novoLivro.autor}
        onChange={handleInputChange}
      />
      {/* Campo para o modelo */}
      <input
        type="text"
        name="editora"
        placeholder="Modelo"
        value={novoLivro.editora}
        onChange={handleInputChange}
      />
      {/* Campo para o ano */}
      <input
        type="text"
        name="gênero"
        placeholder="Gênero"
        value={novoLivro.ano}
        onChange={handleInputChange}
      />
      {/* Botão de envio do formulário */}
      <button type="submit">Adicionar Livro</button>
    </form>

    {/* Lista de veículos */}
    <ul>
      {/* Mapeamento dos veículos */}
      {livros.map((livro) => (
        <li key={livro.id}>
          {/* Exibição dos detalhes do veículo */}
          {livro.título} - {livro.autor} {livro.editora} ({livro.gênero})
          
          {/* Botão de exclusão */}
          <button onClick={() => handleDelete(livro.id)}>Excluir</button>
          
          {/* Botão de atualização */}
          <button
            onClick={() =>
              handleUpdate(livro.id, {
                ...livro,
                modelo: 'Novo livro atualizado', // Exemplo de atualização
              })
            }
          >
            Atualizar
          </button>
        </li>
      ))}
    </ul>
  </div>
);



}

