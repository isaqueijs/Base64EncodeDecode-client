const readline = require('readline-sync')
var soap = require('soap');
var url = 'http://localhost:9090/Base64EncodeDecode?wsdl';

const options = [' String -> Base64', ' Base64 -> String']
var option
var inputString

async function start() {

  const client = await soap.createClientAsync(url)
  console.log('####################################')
  console.log('Codificar para Base64 ou Decodificar')
  console.log('####################################')
  askOption()

  switch (option) {
    case 0:
      inputString = readline.question('Entre com a String para converter: ')
      await getEncode(client, inputString)
      option = -1
      break;

    case 1:
      inputString = readline.question('Entre com a String para converter: ')
      await getDecode(client, inputString)
      option = -1
      break;

    default:
  }

}

function askOption() {
  var selected = readline.keyInSelect(options, 'Escolha uma opção: ')
  option = selected
}

async function getEncode(client, inputString) {
  client.encodeString({ arg0: inputString }, async function (err, result) {
    console.log(`String codificada: ` + result.return)
  })
}

async function getDecode(client, inputString) {
  client.decodeString({ arg0: inputString }, async function (err, result) {
    console.log(`String Base64 decodificada: ` + result.return)
  })
}

start()