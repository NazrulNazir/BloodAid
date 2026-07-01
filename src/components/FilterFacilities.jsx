'use client'

const FilterFacilitiesData = ({ setSport }) => {

  return (
    <div className='flex flex-col gap-1'>

      <p className="label">Status</p>

      <label className="select rounded-xl">

        <select
          className='w-80 border py-2 px-2 rounded-lg'
          onChange={(e) => setSport(e.target.value)}
        >

          <option value="">All</option>

          <option value="inprogress">
            Inprogress
          </option>

          <option value="pending">
            Pending
          </option>

          <option value="done">
            Done
          </option>

          <option value="cancel">
            Cancel
          </option>

          {/* <option value="Basketball">
            Basketball
          </option> */}

        </select>

      </label>

    </div>
  );
};

export default FilterFacilitiesData;