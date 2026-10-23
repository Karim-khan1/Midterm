/**
 * Midterm API Project - COMP229
 * Implement the six equipment API endpoints described in README.md.
 * Use the array index as the ID: index 0 is the first equipment item.
 * Add exactly two personalized items to the five supplied below.
 */
import express from 'express';

const app = express();
app.use(express.json());

let equipment = [
  { name: 'USB Microphone', category: 'audio', brand: 'AudioLab', year: 2021, quantity: 5 },
  { name: 'LED Panel', category: 'lighting', brand: 'BrightWorks', year: 2022, quantity: 4 },
  { name: 'Network Switch', category: 'networking', brand: 'NetCore', year: 2020, quantity: 3 },
  { name: 'Cable Tester', category: 'tools', brand: 'TestPro', year: 2019, quantity: 6 },
  { name: 'Studio Headphones', category: 'audio', brand: 'SoundCraft', year: 2023, quantity: 8 },

{
  name: 'Sony MZ-R30 MiniDisc Recorder',
  category: 'audio',
  brand: 'Sony',
  year: 1997,
  quantity: 2
},
{
  name: 'Roland SC-55 Sound Canvas',
  category: 'audio',
  brand: 'Roland',
  year: 1991,
  quantity: 1
}

];

app.get('/api/equipment', (req, res) => {
  res.status(200).json(equipment);
});



app.get('/api/equipment/filter', (req, res) => {
  const category = req.query.category;

  if (!category) {
    return res.status(400).json({
      error: 'Category is required'
    });
  }

  const filteredEquipment = equipment.filter(item =>
    item.category.toLowerCase() ===
    category.toLowerCase()
  );

  res.status(200).json(filteredEquipment);
});


function isValidIndex(value) {
  if (!/^(0|[1-9]\d*)$/.test(value)) {
    return false;
  }

  const index = Number(value);

  return Number.isSafeInteger(index) &&
    index >= 0 &&
    index < equipment.length;
}

app.get('/api/equipment/:id', (req, res) => {
  if (!isValidIndex(req.params.id)) {
    return res.status(404).json({
      error: 'Equipment not found'
    });
  }

  const index = Number(req.params.id);
  res.status(200).json(equipment[index]);
});

app.post('/api/equipment', (req, res) => {
  const item = req.body;

  if (!item ||
      typeof item !== 'object' ||
      Array.isArray(item) ||
      typeof item.name !== 'string' ||
      typeof item.category !== 'string' ||
      typeof item.brand !== 'string' ||
      !Number.isInteger(item.year) ||
      !Number.isInteger(item.quantity)) {
    return res.status(400).json({
      error: 'Invalid equipment data'
    });
  }

  equipment.push(item);
  res.status(201).json(item);
});

app.put('/api/equipment/:id', (req, res) => {
  if (!isValidIndex(req.params.id)) {
    return res.status(404).json({
      error: 'Equipment not found'
    });
  }

  const changes = req.body;

  if (!changes ||
      typeof changes !== 'object' ||
      Array.isArray(changes)) {
    return res.status(400).json({
      error: 'Invalid update data'
    });
  }

  const index = Number(req.params.id);

  equipment[index] = {
    ...equipment[index],
    ...changes
  };

  res.status(200).json(equipment[index]);
});

app.delete('/api/equipment/:id', (req, res) => {
  if (!isValidIndex(req.params.id)) {
    return res.status(404).json({
      error: 'Equipment not found'
    });
  }

  const index = Number(req.params.id);
  const removed = equipment.splice(index, 1)[0];

  res.status(200).json(removed);
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, '127.0.0.1', err => {
  if (err) {
    console.error(`Cannot start on port ${PORT}: ${err.message}`);
    process.exitCode = 1;
    return;
  }
  console.log(`Server is running on http://localhost:${PORT}`);
});
