import {TestTube, TestTubeRack} from "@src/types/lab";
import React, {useState} from "react";
import {
  Button, Input, Modal, ModalBody,
  ModalContent, ModalFooter,
  ModalHeader,
  Popover,
  PopoverContent,
  PopoverTrigger, Autocomplete,
  useDisclosure, AutocompleteItem
} from "@nextui-org/react";
import {CreateTestTube, CreateTestTubeRack} from "@src/services/lab";
import {format} from "date-fns";

interface TestTubeButtonProp {
  testTube: TestTube | null,
  indexInRack: number,
  getCurrentLab: Function,
  testTubeRackId: number,
  labId: number
}

const TestTubeButton: React.FC<TestTubeButtonProp> = ({testTube, indexInRack, getCurrentLab, testTubeRackId, labId}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [testTubeMessage, setTestTubeMessage] = useState('');
  const [createTestTubeForm, setCreateTestTubeForm] = useState({
    label: '',
    type: ''
  })

  const {isOpen: isCreateTestTubeOpen, onOpen: onCreateTestTubeOpen, onOpenChange: onCreateTestTubeOpenChange, onClose: onCreateTestTubeClose} = useDisclosure();

  const handleCreateTestTube = async () => {
    setIsLoading(true);
    const result = await CreateTestTube(testTubeRackId, createTestTubeForm.label, createTestTubeForm.type, indexInRack);
    if (result.ok) {
      await getCurrentLab(labId);
      setTestTubeMessage('');
      setCreateTestTubeForm({
        label: '',
        type: ''
      });
      onCreateTestTubeClose();
    }
    else {
      setTestTubeMessage(result.message);
    }
    setIsLoading(false);
  }

  return (
    <div>
      <Popover placement="bottom" showArrow={true}>
        <PopoverTrigger>
          <Button isIconOnly color={testTube ? "secondary" : "default"}/>
        </PopoverTrigger>
        <PopoverContent>
          {testTube ?
            <div className='flex flex-col gap-2 p-3'>
              <p className="text-sm">{`试管架${indexInRack}号位`}</p>
              <p className="text-sm font-bold">{testTube.label}</p>
              <p className="text-sm">{testTube.type}</p>
              <div className='flex flex-row gap-3'>
                <p className="text-sm">坐标</p>
                <p className="text-sm">{`x : ${testTube.x}`}</p>
                <p className="text-sm">{`y : ${testTube.y}`}</p>
                <p className="text-sm">{`z : ${testTube.z}`}</p>
              </div>
              <p className="text-sm">{testTube.color ?? '未知颜色'}</p>
              <p className="text-sm text-gray-400">{`创建：${format(testTube.createdAt, 'yyyy-MM-dd HH:mm')}`}</p>
              <p className="text-sm text-gray-400">{`上一次更新：${format(testTube.updatedAt, 'yyyy-MM-dd HH:mm')}`}</p>
            </div> :
            <div className='flex flex-col gap-2 p-3'>
              <p className="text-sm">{`试管架${indexInRack}号位`}</p>
              <p className="text-sm font-bold">暂无试管</p>
              <Button size={"sm"} color={"primary"} onClick={() => {setTestTubeMessage('');onCreateTestTubeOpen();}}>创建试管</Button>
            </div>
          }
        </PopoverContent>
      </Popover>

      <Modal isOpen={isCreateTestTubeOpen} onOpenChange={onCreateTestTubeOpenChange} aria-label='createTestTubeFormModal'>
        <ModalContent>
          {(onClose) => (
            <div>
              <ModalHeader>新建试管</ModalHeader>
              <ModalBody>
                <p className="text-red-500">{testTubeMessage}</p>
                <Input label={"标签"} defaultValue={createTestTubeForm.label} isRequired onChange={(event) => {
                  createTestTubeForm.label = event.target.value;
                  console.log(createTestTubeForm.label);
                }}/>
                <Autocomplete label="选择试管类型" isRequired onInputChange={(value) => {
                  createTestTubeForm.type = value;
                  console.log(createTestTubeForm.type);
                }}>
                  <AutocompleteItem key='Large' value='Large'>Large</AutocompleteItem>
                  <AutocompleteItem key='Small' value='Small'>Small</AutocompleteItem>
                </Autocomplete>
              </ModalBody>
              <ModalFooter>
                <Button color="default" onClick={onClose}>取消</Button>
                <Button color="primary" isLoading={isLoading} onClick={handleCreateTestTube}>创建</Button>
              </ModalFooter>
            </div>
          )}
        </ModalContent>
      </Modal>
    </div>

  )
}

export default TestTubeButton;
