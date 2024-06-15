// Repuestos.js
import React, { useState, useEffect } from 'react';
import { Edit, Delete } from '@mui/icons-material';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Container,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Grid,
  Typography
} from '@mui/material';
import './css/Repuestos.css'

const Repuestos = () => {
  const [repuestos, setRepuestos] = useState([]);
  const [formData, setFormData] = useState({ tipo: '', descripcion: '', cantidad: 0, precio: 0 });
  const [editing, setEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const navigate = useNavigate(); 

  const location = useLocation();
  const { username, password, tipo } = location.state ? location.state : {};

  useEffect(() => {
      fetchRepuestos();
  }, []);

  const fetchRepuestos = async () => {
      try {
          const response = await fetch('http://localhost:3000/repuestos');
          const data = await response.json();
          setRepuestos(data);
      } catch (error) {
          console.error('Error fetching repuestos:', error);
      }
  };

  const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
      e.preventDefault();
      const method = editing ? 'PUT' : 'POST';
      const url = editing ? `http://localhost:3000/repuestos/${currentId}` : 'http://localhost:3000/repuestos';
      try {
          await fetch(url, {
              method,
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(formData)
          });
          setFormData({ tipo: '', descripcion: '', cantidad: 0, precio: 0 });
          setEditing(false);
          setCurrentId(null);
          fetchRepuestos();
      } catch (error) {
          console.error(`Error ${editing ? 'updating' : 'creating'} repuesto:`, error);
      }
  };

  const handleEdit = (repuesto) => {
      setFormData(repuesto);
      setEditing(true);
      setCurrentId(repuesto.id);
  };

  const handleDelete = async (id) => {
      try {
          await fetch(`http://localhost:3000/repuestos/${id}`, { method: 'DELETE' });
          fetchRepuestos();
      } catch (error) {
          console.error('Error deleting repuesto:', error);
      }
  };

  const redirectToAdmin = () => {
      navigate("/admin", { state: { username, password, tipo } });
  };

  return (
    <Container>
       <div className='InventarioDiv'>
          <Typography variant="h4" gutterBottom>
              INVENTARIO DE REPUESTOS
          </Typography>
          <button onClick={redirectToAdmin}>Panel de Control</button>
          {/* <div>
              <h1>Usuario</h1>
              <p>Username: {username}</p>
              <p>Password: {password}</p>
              <p>Tipo: {tipo}</p>
          </div> */}
      </div>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              label="Tipo"
              name="tipo"
              value={formData.tipo}
              onChange={handleInputChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Descripción"
              name="descripcion"
              value={formData.descripcion}
              onChange={handleInputChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Cantidad"
              type="number"
              name="cantidad"
              value={formData.cantidad}
              onChange={handleInputChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Precio"
              type="number"
              step="0.01"
              name="precio"
              value={formData.precio}
              onChange={handleInputChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              {editing ? 'Actualizar' : 'Agregar'}
            </Button>
          </Grid>
        </Grid>
      </form>
      <TableContainer component={Paper} style={{ marginTop: '20px' }} >
        <Table>
          
            <TableHead>
                <TableRow>
                <TableCell>Tipo</TableCell>
                <TableCell>Descripción</TableCell>
                <TableCell>Cantidad</TableCell>
                <TableCell>Precio</TableCell>
                <TableCell>Acciones</TableCell>
                </TableRow>
            </TableHead>
          
          <TableBody>
            {repuestos.map((repuesto) => (
              <TableRow key={repuesto.id}>
                <TableCell>{repuesto.tipo}</TableCell>
                <TableCell>{repuesto.descripcion}</TableCell>
                <TableCell>{repuesto.cantidad}</TableCell>
                <TableCell>{repuesto.precio}</TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={() => handleEdit(repuesto)}>
                    <Edit />
                  </IconButton>
                  <IconButton color="secondary" onClick={() => handleDelete(repuesto.id)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default Repuestos;
