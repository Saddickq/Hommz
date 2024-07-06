import { perks } from "./index"

const AvailablePerks = ({ value, onChange }) => {
    const handlePerks = (event) => {
        const { checked, name } = event.target;
    
        if (checked) {
            const perkToAdd = perks.find(perk => perk.name === name);
            if (perkToAdd) {
                onChange([...value, perkToAdd]);
            }
        } else { 
            onChange(value.filter(perk => perk.name !== name));
        }
    };
  return (
    <div>
      <h2 className="text-2xl text-primary mt-2 font-bold">Perks</h2>
      <p className="text-sm text-gray-500 -mb-1">Select all the available perks your apartment has.</p>
        
      <div>    
            <div className="grid gap-3 grid-cols-2 md:grid-cols-3 lg:grid-cols-3 my-3">
                {
                    perks.map(perk => {
                        return (
                            <label key={perk.name} className="border flex p-2 gap-2 rounded-xl items-center">
                                <input type="checkbox" checked={value.some(selected => selected.name === perk.name)} onChange={handlePerks} name={perk.name} />
                                <perk.svgUrl className="size-6 text-gray-600" />
                                <span className='text-gray-500'>{perk.name}</span>
                            </label>
                        )
                    })
                }
            </div>
        </div>
    </div>
  )
}

export default AvailablePerks
