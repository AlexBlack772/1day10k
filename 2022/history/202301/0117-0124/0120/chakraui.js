function AlertDialogExample() {
   const { isOpen, onOpen, onClose } = useDisclosure()
   const cancelRef = React.useRef()

   return (
      <>
         <Button colorScheme='red' onClick={onOpen}>
            Delete Customer
         </Button>

         <AlertDialog
            isOpen={isOpen}
            leastDestructiveRef={cancelRef}
            onClose={onClose}
         >
            <AlertDialogOverlay>
               <AlertDialogContent>
                  <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                     Delete Customer
                  </AlertDialogHeader>

                  <AlertDialogBody>
                     Are you sure? You can't undo this action afterwards.
                  </AlertDialogBody>

                  <AlertDialogFooter>
                     <Button ref={cancelRef} onClick={onClose}>
                        Cancel
                     </Button>
                     <Button colorScheme='red' onClick={onClose} ml={3}>
                        Delete
                     </Button>
                  </AlertDialogFooter>
               </AlertDialogContent>
            </AlertDialogOverlay>
         </AlertDialog>
      </>
   )
}

<Menu>
   {({ isOpen }) => (
      <>
         <MenuButton isActive={isOpen} as={Button} rightIcon={<ChevronDownIcon />}>
            {isOpen ? 'Close' : 'Open'}
         </MenuButton>
         <MenuList>
            <MenuItem>Download</MenuItem>
            <MenuItem onClick={() => alert('Kagebunshin')}>Create a Copy</MenuItem>
         </MenuList>
      </>
   )}
</Menu>

//
function Example() {
   const format = (val) => `$` + val
   const parse = (val) => val.replace(/^\$/, '')

   const [value, setValue] = React.useState('1.53')

   return (
      <NumberInput
         onChange={(valueString) => setValue(parse(valueString))}
         value={format(value)}
         max={50}
      >
         <NumberInputField />
         <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
         </NumberInputStepper>
      </NumberInput>
   )
}

//
function Example() {
   const format = (val) => `$` + val
   const parse = (val) => val.replace(/^\$/, '')

   const [value, setValue] = React.useState('1.53')

   return (
      <NumberInput
         onChange={(valueString) => setValue(parse(valueString))}
         value={format(value)}
         max={50}
      >
         <NumberInputField />
         <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
         </NumberInputStepper>
      </NumberInput>
   )
}

//
function SliderThumbWithTooltip() {
   const [sliderValue, setSliderValue] = React.useState(5)
   const [showTooltip, setShowTooltip] = React.useState(false)
   return (
      <Slider
         id='slider'
         defaultValue={5}
         min={0}
         max={100}
         colorScheme='teal'
         onChange={(v) => setSliderValue(v)}
         onMouseEnter={() => setShowTooltip(true)}
         onMouseLeave={() => setShowTooltip(false)}
      >
         <SliderMark value={25} mt='1' ml='-2.5' fontSize='sm'>
            25%
         </SliderMark>
         <SliderMark value={50} mt='1' ml='-2.5' fontSize='sm'>
            50%
         </SliderMark>
         <SliderMark value={75} mt='1' ml='-2.5' fontSize='sm'>
            75%
         </SliderMark>
         <SliderTrack>
            <SliderFilledTrack />
         </SliderTrack>
         <Tooltip
            hasArrow
            bg='teal.500'
            color='white'
            placement='top'
            isOpen={showTooltip}
            label={`${sliderValue}%`}
         >
            <SliderThumb />
         </Tooltip>
      </Slider>
   )
}

//
<StatGroup>
   <Stat>
      <StatLabel>Sent</StatLabel>
      <StatNumber>345,670</StatNumber>
      <StatHelpText>
         <StatArrow type='increase' />
         23.36%
      </StatHelpText>
   </Stat>

   <Stat>
      <StatLabel>Clicked</StatLabel>
      <StatNumber>45</StatNumber>
      <StatHelpText>
         <StatArrow type='decrease' />
         9.05%
      </StatHelpText>
   </Stat>
</StatGroup>