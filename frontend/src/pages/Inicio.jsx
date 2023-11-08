import {
    Box,
    Flex,
    Text,
    Button,
    Stat,
    StatLabel,
    StatNumber,
    StatHelpText,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
  } from "@chakra-ui/react";
  
  const Inicio = () => {
    return (
      <Box p={4}>
        <Flex mb={4} justify="space-between">
          <Text fontSize="2xl" fontWeight="bold">
            Dashboard
          </Text>
    
        </Flex>
  
        <Flex mb={4}>
          <Stat p={4} bg="gray.100" borderRadius="md" mr={4}>
            <StatLabel>Total Eventos</StatLabel>
            <StatNumber>345</StatNumber>
            <StatHelpText>Desde el último mes</StatHelpText>
          </Stat>
  
          <Stat p={4} bg="gray.100" borderRadius="md" mr={4}>
            <StatLabel>Total Jugadores</StatLabel>
            <StatNumber>780</StatNumber>
            <StatHelpText>Desde el último mes</StatHelpText>
          </Stat>
          
          <Stat p={4} bg="gray.100" borderRadius="md" flex="1">
          <StatLabel>Total Partidas</StatLabel>
          <StatNumber>120</StatNumber>
          <StatHelpText>Desde el último mes</StatHelpText>
        </Stat>
        </Flex>
  
        <Box bg="white" borderRadius="md" p={4}>
          <Text mb={2} fontSize="xl" fontWeight="bold">
            Últimos Eventos
          </Text>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Evento</Th>
                <Th>Fecha</Th>
                <Th>Ubicación</Th>
                <Th>Estado</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>Evento 1</Td>
                <Td>20/09/2023</Td>
                <Td>Estadio 1</Td>
                <Td>Activo</Td>
              </Tr>
              <Tr>
                <Td>Evento 2</Td>
                <Td>21/09/2023</Td>
                <Td>Estadio 2</Td>
                <Td>Activo</Td>
              </Tr>
            </Tbody>
          </Table>
        </Box>
      </Box>
    );
  };
  
  export default Inicio;
  