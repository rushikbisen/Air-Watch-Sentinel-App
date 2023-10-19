# Use the official ASP.NET Core 6.0 runtime as a parent image
FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80

# Use the official ASP.NET Core 6.0 SDK as a parent image for building
FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["WatchList.csproj", "./"]
RUN dotnet restore "WatchList.csproj"
COPY . .
WORKDIR "/src/."
RUN dotnet build "WatchList.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "WatchList.csproj" -c Release -o /app/publish

# Build the final image
FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "WatchList.dll"]
