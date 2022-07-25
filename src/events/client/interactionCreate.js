module.exports = {
  name: "interactionCreate",
  async execute(inteaction, client) {
    if (inteaction.isChatInputCommand()) {
      const { commands } = client;
      const { commandName } = inteaction;
      const command = commands.get(commandName);
      if (!command) return;

      try {
        command.execute(inteaction, client);
      } catch (error) {
        console.error(error);
        await inteaction.reply({
          content: `Something went wrong while executing this command...`,
          ephemeral: true,
        });
      }
    } else if (inteaction.isButton()) {
      const { buttons } = client;
      const { customId } = inteaction;
      const button = buttons.get(customId);
      if (!button) return new Error('There is no code for this button.');

      try {
        await button.execute(inteaction, client);
      } catch (error) {
        console.error(error);
      }
    }
  },
};
