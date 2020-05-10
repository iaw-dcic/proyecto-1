
    let posiblesPalabrasLevel1 = ['banana', 'tomate', 'manzana', 'naranja',
        'ciruela', 'kiwi', 'frutilla', 'sandia', 'cereza', 'pomelo',
        'arandano', 'fresa', 'melon', 'limon'];
    let posiblesPalabrasLevel2 = ['regla', 'clips', 'legajo', 'minuta',
        'centro', 'sede', 'recibo', 'circular', 'anuario', 'ponelo',
        'lapiz', 'mesa', 'ficha', 'fichero', 'lapiz', 'grapa', 'sueldo', 'horas', 'carpeta', 'folio', 'reunion', 'jefe'];
    let posiblesPalabrasLevel3 = ['papagaya', 'aplastada', 'harta', 'nalga',
        'masa', 'chapa', 'carpa', 'saldra', 'calla', 'rasca',
        'chacra', 'grasa', 'bala', 'balanza', 'trabaja', 'alza', 'halaga', 'mala', 'malla', 'maya',
        'vaya', 'valla', 'vaca', 'baraja', 'calma', 'playa', 'laja', 'barata'];
    var levels=[new Level(posiblesPalabrasLevel1, 10, 10, 5, { backwards: 0 }),new Level(posiblesPalabrasLevel2, 12, 12, 7, { backwards: 0.3 }),new Level(posiblesPalabrasLevel3, 15, 15, 10, { letters: 'aaaaaaaaaaaaaaabcdefghijklmnopqrstuvwxyz'})];
