let contenedor;
const total_pokemons = 500;
window.onload = inicio;

async function aleatorio(min, max) { 
  return Math.floor(Math.random() * (max - min + 1) + min);
}

async function inicio() {
  contenedor = document.getElementById("vitrina");
  window.addEventListener("click", pintarVitrina);
}

async function pintarVitrina(evento) {
  contenedor.innerHTML = "";
  for (let i = 0; i < 5; i++) {
    const id = await aleatorio(1, total_pokemons);
    const data = await traerDatos(id);
    if (data) {
      const nombre = data.name;
      const url = data.sprites.other.dream_world.front_default;
      const stats = data.stats;
      imprimirTarjeta(nombre, url, stats);
    }
  }
}

async function traerDatos(id) {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

function imprimirTarjeta(nombre, url, stats) {
  let template = `<div class="tarjeta">
    <img src="${url}" alt="" >
    <br>
    <label for="">
      ${nombre}
    </label> <br>
    <label for="">
      Stats:
      <ul>
        ${stats.map(stat => `<li>${stat.stat.name}: ${stat.base_stat}</li>`).join('')}
      </ul>
    </label>
  </div>`;
  contenedor.innerHTML += template;
}