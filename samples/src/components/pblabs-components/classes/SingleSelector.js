
class SingleSelector
{
	#items;
	#selectedIndex;

	constructor( items )
	{
		this.#items = items;
		this.#selectedIndex = 0;
	}

	get items()
	{
		return this.#items;
	}

	get selected()
	{
		return this.#items[this.#selectedIndex];
	}

	select( itemIndex )
	{
		this.#selectedIndex = itemIndex;
	}
}


